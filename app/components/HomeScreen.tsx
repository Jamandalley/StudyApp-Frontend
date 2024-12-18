import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HomeScreenProps = {
  onUpload: () => void
}

export default function HomeScreen({ onUpload }: HomeScreenProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-6">StudyApp</h1>
      <Button onClick={onUpload} className="w-full mb-4">
        <Upload className="mr-2 h-4 w-4" /> Upload Study Materials
      </Button>
      <p className="text-sm text-gray-500">Upload your materials to generate quiz questions.</p>
    </div>
  )
}

