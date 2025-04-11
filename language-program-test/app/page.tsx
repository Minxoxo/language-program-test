"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CloudIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-400 to-blue-100 relative overflow-hidden">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12 text-center relative z-10">
        <div className="space-y-12">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <CloudIcon className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-blue-700 leading-relaxed">
              당신에게 맞는 외국어 프로그램을 알아봅시다!
            </h1>
            <p className="text-lg md:text-xl text-blue-600 font-medium">
              7문항으로 알아보는 나의 학습 성향과 최적의 프로그램!
            </p>
          </div>

          <p className="text-sm md:text-base text-blue-500">동의대학교 국제언어교육원</p>

          <div>
            <Link href="/test">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-xl rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105">
                시작하기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30 blur-xl"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: "float 15s infinite ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Blue wave decorations */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 bg-blue-500/20 -z-5"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 40%, 75% 70%, 50% 40%, 25% 70%, 0% 40%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-32 bg-blue-600/20 -z-5"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 45%, 85% 65%, 60% 45%, 35% 65%, 15% 45%, 0% 65%)",
        }}
      />

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(15px);
          }
        }
      `}</style>
    </main>
  )
}
