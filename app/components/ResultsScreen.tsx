import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react"

type Question = {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

type ResultsScreenProps = {
  questions: Question[]
  answers: number[]
  onReturnHome: () => void
}

export default function ResultsScreen({ questions, answers, onReturnHome }: ResultsScreenProps) {
  const [showDetails, setShowDetails] = useState(false)
  const correctAnswers = questions.filter((q, index) => q.correctAnswer === answers[index]).length

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
      <p className="mb-2">Total Questions: {questions.length}</p>
      <p className="mb-2">Correct Answers: {correctAnswers}</p>
      <p className="mb-4">Score: {Math.round((correctAnswers / questions.length) * 100)}%</p>

      <Button onClick={() => setShowDetails(!showDetails)} className="w-full mb-4 flex items-center justify-center">
        {showDetails ? "Hide" : "Show"} Details
        {showDetails ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
      </Button>

      {showDetails && (
        <div className="mt-4 space-y-4 max-h-60 overflow-y-auto">
          {questions.map((question, index) => (
            <div key={question.id} className="border rounded p-3">
              <div className="flex items-start">
                {answers[index] === question.correctAnswer ? (
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                ) : (
                  <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">{question.text}</p>
                  <p className="text-sm text-gray-600">Your answer: {question.options[answers[index]]}</p>
                  {answers[index] !== question.correctAnswer && (
                    <p className="text-sm text-green-600">Correct answer: {question.options[question.correctAnswer]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button onClick={onReturnHome} className="w-full mt-4">
        Return to Home
      </Button>
    </div>
  )
}

