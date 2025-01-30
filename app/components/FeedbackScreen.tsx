"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

type FeedbackScreenProps = {
  onSubmit: (rating: number, comment: string, email: string) => void
  onCancel: () => void
}

export default function FeedbackScreen({ onSubmit, onCancel, isSubmitting }: FeedbackScreenProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    onSubmit(rating, comment, email)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Give Feedback</h2>
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
            <Star className={`w-8 h-8 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <Textarea
        placeholder="Tell us about your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full mb-4"
        rows={4}
      />
      <div className="flex justify-between">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting || rating === 0 || !email}>
          {isSubmitting ? "Submitting Feedback..." : "Submit Feedback"}
        </Button>
      </div>
    </div>
  )
}

