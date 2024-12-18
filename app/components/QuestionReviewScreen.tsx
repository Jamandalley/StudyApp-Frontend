import { Button } from '@/components/ui/button'

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

type QuestionReviewScreenProps = {
  questions: Question[];
  onStart: () => void;
}

export default function QuestionReviewScreen({ questions, onStart }: QuestionReviewScreenProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Question Review</h2>
      <p className="mb-4">Total questions generated: {questions.length}</p>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Sample Questions:</h3>
        <ul className="list-disc pl-5">
          {questions.slice(0, 2).map((question) => (
            <li key={question.id} className="text-sm text-gray-600 mb-2">{question.text}</li>
          ))}
        </ul>
      </div>
      <Button onClick={onStart} className="w-full">Start Quiz</Button>
    </div>
  )
}

