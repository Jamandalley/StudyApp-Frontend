import { Upload, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

type HomeScreenProps = {
  onUpload: () => void
  onFeedback: () => void
}

export default function HomeScreen({ onUpload, onFeedback }: HomeScreenProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-6">StudyApp</h1>
      <Button onClick={onUpload} className="w-full mb-4">
        <Upload className="mr-2 h-4 w-4" /> Upload Study Material
      </Button>
      <Button onClick={onFeedback} variant="outline" className="w-full mb-4">
        <MessageSquare className="mr-2 h-4 w-4" /> Give Feedback
      </Button>
      <p className="text-sm text-gray-500">Upload your material to generate quiz questions.</p>
    </div>
  )
}

