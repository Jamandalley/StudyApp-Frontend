"use client"

import { useState } from "react"
import HomeScreen from "./components/HomeScreen"
import UploadScreen from "./components/UploadScreen"
import ProcessingScreen from "./components/ProcessingScreen"
import QuestionReviewScreen from "./components/QuestionReviewScreen"
import QuestionScreen from "./components/QuestionScreen"
import ResultsScreen from "./components/ResultsScreen"
import FeedbackScreen from "./components/FeedbackScreen"
import { ToastProvider, useToast } from "./contexts/ToastContext"

type Question = {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

function StudyAppContent() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast()

  const handleUpload = async (file: File) => {
        setCurrentScreen('processing');

        setTimeout(async () => {
            try {
                const formData = new FormData();
                formData.append('file', file);

                // Make an API call to your backend (Next.js API route or external API)
                const response = await fetch('https://studyapp-backend-w1jm.onrender.com/generate-questions', {
                    method: 'POST',
                    body: formData,
                });
                console.log(response);

                if (!response.ok) {
                    throw new Error('Failed to generate questions. Please try again.');
                }

                const data = await response.json();

                if (!data.questions || !Array.isArray(data.questions)) {
                    throw new Error('Invalid response format from API.');
                }

                // Use API questions if successful
                setQuestions(data.questions);
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Using placeholder questions due to an error.');

                // Fallback to placeholder questions
                const placeholderQuestions: Question[] = [
                    {
                        id: 1,
                        text: "What is the capital of France?",
                        options: ["London", "Berlin", "Paris", "Madrid"],
                        correctAnswer: 2,
                    },
                    {
                        id: 2,
                        text: "Which planet is known as the Red Planet?",
                        options: ["Venus", "Mars", "Jupiter", "Saturn"],
                        correctAnswer: 1,
                    },
                ];
                setQuestions(placeholderQuestions);
            } finally {
                setCurrentScreen('review');
            }
        }, 3000);
    };

  const startQuiz = () => {
    setCurrentScreen("question")
    setCurrentQuestionIndex(0)
    setAnswers([])
  }

  const handleAnswer = (answerIndex: number) => {
    setAnswers([...answers, answerIndex])
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setCurrentScreen("results")
    }
  }

  const returnHome = () => {
    setCurrentScreen("home")
  }

//   const handleFeedback = (rating: number, comment: string, email: string) => {
//     // Here you would typically send this data to your backend
//     console.log(`Feedback received: Rating: ${rating}, Comment: ${comment}, Email: ${email}`)
//     showToast("Thank you for your feedback!")
//     setCurrentScreen("home")
//   }

const handleFeedback = async (rating: number, comment: string, email: string) => {
    setIsSubmitting(true); // Change button text
    showToast("Thank you for your feedback!");
    setCurrentScreen("home");

    // Send request in the background
    try {
        await fetch('https://studyapp-backend-w1jm.onrender.com/submit-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, comment, email })
        });
    } catch (error) {
        console.error("Error submitting feedback:", error);
    } finally {
        setIsSubmitting(false); // Reset button text
    }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {currentScreen === "home" && (
          <HomeScreen onUpload={() => setCurrentScreen("upload")} onFeedback={() => setCurrentScreen("feedback")} />
        )}
        {currentScreen === "upload" && <UploadScreen onUpload={handleUpload} />}
        {currentScreen === "processing" && <ProcessingScreen />}
        {currentScreen === "review" && <QuestionReviewScreen questions={questions} onStart={startQuiz} />}
        {currentScreen === "question" && (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            totalQuestions={questions.length}
            currentQuestionNumber={currentQuestionIndex + 1}
          />
        )}
        {currentScreen === "results" && (
          <ResultsScreen questions={questions} answers={answers} onReturnHome={returnHome} />
        )}
        {currentScreen === "feedback" && <FeedbackScreen onSubmit={handleFeedback} onCancel={returnHome} />}
      </div>
    </div>
  )
}

export default function StudyApp() {
  return (
    <ToastProvider>
      <StudyAppContent />
    </ToastProvider>
  )
}

