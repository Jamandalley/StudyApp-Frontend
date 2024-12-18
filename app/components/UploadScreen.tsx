import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

type UploadScreenProps = {
  onUpload: (file: File) => void
}

export default function UploadScreen({ onUpload }: UploadScreenProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Upload Study Materials</h2>
      <div className="border-2 border-dashed border-gray-300 p-6 mb-4 rounded-lg">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          accept=".pdf,.doc,.docx,.txt"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT</p>
        </label>
      </div>
      {file && <p className="mb-4 text-sm text-gray-600">Selected file: {file.name}</p>}
      <Button onClick={handleUpload} disabled={!file} className="w-full">
        Confirm Upload
      </Button>
    </div>
  )
}

