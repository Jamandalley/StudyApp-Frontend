import { Button } from '@/components/ui/button'

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

type ResultsScreenProps = {
  questions: Question[];
  answers: number[];
  onReturnHome: () => void;
}

export default function ResultsScreen({ questions, answers, onReturnHome }: ResultsScreenProps) {
  const correctAnswers = questions.filter((q, index) => q.correctAnswer === answers[index]).length

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
      <p className="mb-2">Total Questions: {questions.length}</p>
      <p className="mb-2">Correct Answers: {correctAnswers}</p>
      <p className="mb-4">Score: {Math.round((correctAnswers / questions.length) * 100)}%</p>
      <Button onClick={onReturnHome} className="w-full">Return to Home</Button>
    </div>
  )
}

