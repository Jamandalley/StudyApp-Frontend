'use client'

import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import UploadScreen from './components/UploadScreen'
import ProcessingScreen from './components/ProcessingScreen'
import QuestionReviewScreen from './components/QuestionReviewScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultsScreen from './components/ResultsScreen'

type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

export default function StudyApp() {
    const [currentScreen, setCurrentScreen] = useState('home')
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])

    const handleUpload = async (file: File) => {
        setCurrentScreen('processing');

        setTimeout(async () => {
            try {
                const formData = new FormData();
                formData.append('file', file);

                // Make an API call to your backend (Next.js API route or external API)
                const response = await fetch('http://localhost:4000/generate-questions', {
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
        setCurrentScreen('question')
        setCurrentQuestionIndex(0)
        setAnswers([])
    }

    const handleAnswer = (answerIndex: number) => {
        setAnswers([...answers, answerIndex])
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            setCurrentScreen('results')
        }
    }

    const returnHome = () => {
        setCurrentScreen('home')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {currentScreen === 'home' && <HomeScreen onUpload={() => setCurrentScreen('upload')} />}
                {currentScreen === 'upload' && <UploadScreen onUpload={handleUpload} />}
                {currentScreen === 'processing' && <ProcessingScreen />}
                {currentScreen === 'review' && <QuestionReviewScreen questions={questions} onStart={startQuiz} />}
                {currentScreen === 'question' && (
                    <QuestionScreen
                        question={questions[currentQuestionIndex]}
                        onAnswer={handleAnswer}
                        totalQuestions={questions.length}
                        currentQuestionNumber={currentQuestionIndex + 1}
                    />
                )}
                {currentScreen === 'results' && (
                    <ResultsScreen
                        questions={questions}
                        answers={answers}
                        onReturnHome={returnHome}
                    />
                )}
            </div>
        </div>
    )
}

