"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { programs } from "@/lib/programs"
import Link from "next/link"

type ProgramScores = {
  토익사관학교: number
  토익입문반: number
  토익750반: number
  원어민과함께하는기초회화반: number
  모의토익시험: number
  엘리트프로그램: number
  JLPTHSK특강: number
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [recommendedProgram, setRecommendedProgram] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const scoresParam = searchParams.get("scores")

    if (scoresParam) {
      try {
        const scores = JSON.parse(decodeURIComponent(scoresParam)) as ProgramScores
        const program = determineRecommendedProgram(scores)
        setRecommendedProgram(program)
      } catch (error) {
        console.error("Error parsing scores:", error)
      }
    }

    setLoading(false)
  }, [searchParams])

  const determineRecommendedProgram = (scores: ProgramScores) => {
    // Find the highest score
    const maxScore = Math.max(...Object.values(scores))

    // Get all programs with the highest score
    const topPrograms = Object.keys(scores).filter((program) => scores[program as keyof ProgramScores] === maxScore)

    // If there's only one top program, return it
    if (topPrograms.length === 1) {
      return topPrograms[0]
    }

    // If there are ties, use the priority order
    const priorityOrder = [
      "토익사관학교",
      "토익입문반",
      "토익750반",
      "원어민과함께하는기초회화반",
      "모의토익시험",
      "엘리트프로그램",
      "JLPTHSK특강",
    ]

    // Return the program with the highest priority
    for (const program of priorityOrder) {
      if (topPrograms.includes(program)) {
        return program
      }
    }

    // Fallback
    return topPrograms[0]
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-blue-100">
        <p className="text-blue-700 text-xl">결과를 계산 중입니다...</p>
      </div>
    )
  }

  const program = recommendedProgram ? programs[recommendedProgram as keyof typeof programs] : null

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-blue-100">
        <p className="text-red-600 text-xl">결과를 불러올 수 없습니다.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-300 to-blue-100">
      <Card className="max-w-3xl w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">
            {program.emoji} {program.title} 추천!
          </h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">✨ 프로그램 소개</h2>
            <ul className="space-y-2 text-blue-700">
              {program.description.map((desc, index) => (
                <li key={index} className="flex">
                  <span className="mr-2">({index + 1})</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">💡 당신은 이런 성향!</h2>
            <ul className="space-y-2 text-blue-700">
              {program.traits.map((trait, index) => (
                <li key={index} className="flex">
                  <span className="mr-2">✔</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center text-lg font-medium text-blue-800">
            👉 그래서 당신은 '{program.shortTitle}' {program.matchPhrase}!
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">📘 프로그램 안내</h2>
            <ul className="space-y-2 text-blue-700">
              {program.details.map((detail, index) => (
                <li key={index} className="flex">
                  <span className="mr-2">{detail.icon}</span>
                  <span>{detail.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="https://linktr.ee/english1004" target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
              프로그램 보러가기
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  )
}
