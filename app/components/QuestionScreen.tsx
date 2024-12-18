import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

type QuestionScreenProps = {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  totalQuestions: number;
  currentQuestionNumber: number;
}

export default function QuestionScreen({ question, onAnswer, totalQuestions, currentQuestionNumber }: QuestionScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswer = () => {
    if (selectedAnswer !== null) {
      onAnswer(selectedAnswer)
      setSelectedAnswer(null)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Question {currentQuestionNumber} of {totalQuestions}</h2>
      <p className="mb-4">{question.text}</p>
      <div className="space-y-2 mb-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            className={`w-full text-left p-2 rounded ${
              selectedAnswer === index ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <Button onClick={handleAnswer} disabled={selectedAnswer === null} className="w-full">
        Next
      </Button>
    </div>
  )
}

