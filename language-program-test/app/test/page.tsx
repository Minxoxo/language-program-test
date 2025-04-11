"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { questions } from "@/lib/questions"

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [scores, setScores] = useState({
    토익사관학교: 0,
    토익입문반: 0,
    토익750반: 0,
    원어민과함께하는기초회화반: 0,
    모의토익시험: 0,
    엘리트프로그램: 0,
    JLPTHSK특강: 0,
  })

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value)
  }

  const handleNextQuestion = () => {
    if (selectedOption === null) return

    // Update scores based on selected option
    const option = questions[currentQuestion].options.find((opt) => opt.id === selectedOption)

    if (option) {
      const newScores = { ...scores }
      option.scores.forEach((score) => {
        newScores[score.program] += score.value
      })
      setScores(newScores)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
    } else {
      // Navigate to results page with scores
      const encodedScores = encodeURIComponent(JSON.stringify(scores))
      router.push(`/results?scores=${encodedScores}`)
    }
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-300 to-blue-100">
      <Card className="max-w-3xl w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-blue-600 font-medium">
              문항 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm text-blue-600 font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-blue-100" indicatorClassName="bg-blue-600" />
        </div>

        <div className="space-y-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-blue-800">{question.text}</h2>

          <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect} className="space-y-3">
            {question.options.map((option) => (
              <div
                key={option.id}
                className="flex items-start space-x-2 border border-blue-100 rounded-lg p-4 hover:bg-blue-50 transition-colors"
              >
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <Label htmlFor={option.id} className="text-base cursor-pointer flex-1">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {currentQuestion < questions.length - 1 ? "다음 문제" : "결과 보기"}
          </Button>
        </div>
      </Card>
    </main>
  )
}
