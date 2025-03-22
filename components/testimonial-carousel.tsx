"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "Vidify has completely transformed how I create content summaries. What used to take hours now takes minutes.",
    author: "Sarah Johnson",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "CreativeMind Studios",
  },
  {
    quote:
      "As a researcher, I need to extract insights from hours of interview footage. Vidify's AI summarization is remarkably accurate.",
    author: "Dr. Michael Chen",
    role: "Research Director",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Institute of Data Science",
  },
  {
    quote:
      "We've integrated Vidify into our educational platform, and our students love being able to quickly get summaries of lecture videos.",
    author: "Jennifer Torres",
    role: "EdTech Lead",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "LearnSmart Academy",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative py-10">
      <Card className="p-8 border-accent bg-accent/5 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-primary/20">
          <Quote size={60} />
        </div>

        <div className="relative z-10">
          <p className="text-lg md:text-xl italic mb-6">"{testimonials[currentIndex].quote}"</p>

          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].author} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {testimonials[currentIndex].author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div>
              <h4 className="font-medium">{testimonials[currentIndex].author}</h4>
              <p className="text-sm text-muted-foreground">
                {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8 border-primary/20"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>

        <div className="flex gap-1 items-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-primary" : "w-2 bg-primary/20"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Testimonial {index + 1}</span>
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8 border-primary/20"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}

