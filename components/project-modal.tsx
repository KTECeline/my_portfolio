"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProjectModalProps {
  project: {
    title: string
    description: string
    tech: string[]
    link?: string
    emoji: string
    image: string
    contribution?: string
  }
}

export function ProjectModal({ project }: ProjectModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        className="absolute bottom-3 right-3 bg-black/50 text-white hover:bg-black/70 rounded-full h-8 w-8 p-0"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">View project details</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-purple-900 border-purple-500/30 text-white m-4">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-3">
              <span className="text-2xl md:text-3xl">{project.emoji}</span>
              {project.title}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="rounded-lg overflow-hidden mb-4 md:mb-6">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <p className="text-base md:text-lg mb-4 md:mb-6">{project.description}</p>

            {project.contribution && (
              <div className="mb-4 md:mb-6 bg-purple-500/20 p-3 rounded-md">
                <p className="text-white font-bold text-sm md:text-base">
                  My Role: <span className="text-pink-300">{project.contribution}</span>
                </p>
              </div>
            )}

            <div className="mb-4 md:mb-6">
              <h4 className="text-base md:text-lg font-semibold mb-2">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-purple-500/20 text-white border-purple-500/30 px-2 md:px-3 py-1 text-sm md:text-base"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {project.link && (
              <div className="flex justify-end">
                <Button
                  className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  asChild
                >
                  <Link href={project.link} target="_blank">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Project
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
