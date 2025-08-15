"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail, Phone, ExternalLink, Users, Trophy, Linkedin, Calendar, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import {motion, AnimatePresence} from "framer-motion";
import Toolbox from "@/components/Toolbox";

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [achievementFilter, setAchievementFilter] = useState("All")


  const skills = [
    { name: "Python", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "HTML/CSS", level: 90 },
    { name: "PHP", level: 80 },
    { name: "MySQL", level: 85 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Laravel", level: 85 },
    { name: "Solidity", level: 75 },
    { name: "React", level: 85 },
  ];

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      title: "Agent Royale AI",
      description:
        "AI Trading Game with ELIZA OS integration featuring intelligent agents and real-time trading simulation",
      tech: ["ELIZA OS", "AI", "Trading", "JavaScript"],
      link: "https://agent-royale-ai.vercel.app/",
      emoji: "🤖",
      featured: true,
    },
    {
      title: "AI-Powered Liquidity Pool Advisor",
      description: "Advanced DeFi analytics tool for optimizing liquidity pool strategies in the Ethereum ecosystem",
      tech: ["AI", "DeFi", "Blockchain", "Frontend", "Integration"],
      link: "https://ethglobal-agentic.vercel.app/",
      emoji: "💧",
      featured: true,
      contribution: "Frontend Development & Integration",
    },
    {
      title: "NFT Marketplace",
      description: "Decentralized NFT trading platform with Solidity smart contracts backend",
      tech: ["Solidity", "Blockchain", "Web3", "Smart Contracts"],
      link: "https://encode-hackathon-ten.vercel.app/",
      emoji: "🖼️",
      featured: true,
    },
    {
      title: "Budget AI Advisor",
      description: "Intelligent financial guidance system built with Node.js and Gemini 1.5 Pro API",
      tech: ["Node.js", "Gemini API", "AI", "Financial Tech"],
      emoji: "💰",
      featured: false,
    },
    {
      title: "QuantTrading Backtest System",
      description: "Comprehensive quantitative trading and backtesting mechanism for financial analysis",
      tech: ["Python", "Trading", "Analytics", "Finance"],
      emoji: "📈",
      featured: false,
    },
    {
      title: "Asset Management System",
      description: "Internal Laravel application for comprehensive company asset allocation management",
      tech: ["Laravel", "PHP", "MySQL", "Enterprise"],
      emoji: "📊",
      featured: false,
    },
  ]

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "SoftWare International",
      period: "Oct 2024 - Jan 2025 (3 months)",
      description:
        "Built internal Laravel application for asset allocation management, improving company efficiency by 40%",
      current: false,
    },
    {
      title: "Part Time Translator",
      company: "EndlessFantasy Translation",
      period: "Oct 2021 - Jan 2024",
      description: "Translated technical documents and content, maintaining 99% accuracy rate",
      current: false,
    },
    {
      title: "Part Time Customer Service",
      company: "Wereg Properties",
      period: "June - Aug 2022",
      description: "Provided excellent customer support and resolved client inquiries efficiently",
      current: false,
    },
    {
      title: "Part Time Coach",
      company: "EyeLevel Bukit Jalil",
      period: "June - Aug 2022",
      description: "Mentored students in mathematics and problem-solving techniques",
      current: false,
    },
  ]

  const achievements = [
    { name: "Solana Hackfest 2024", type: "Hackathon", year: "2024" },
    { name: "DevCon 2024, ETH Bangkok", type: "Conference", year: "2024" },
    { name: "Cisco Networking Certificate", type: "Certification", year: "2024" },
    { name: "Math Galactica 2023 - Quantum Quest", type: "Competition", year: "2023" },
    { name: "ImaGINEHACK 2024 (Taylor's)", type: "Hackathon", year: "2024" },
    { name: "Internal APU CTF 2024", type: "Competition", year: "2024" },
    { name: "University Future of Blockchain Hackathon 2025", type: "Hackathon", year: "2025" },
    { name: "Agentic Ethereum 2025 (ETHGlobal)", type: "Hackathon", year: "2025" },
    { name: "Breakout SOLANA/ MEGAHACK 2025", type: "Hackathon", year: "2025" }
  ]

  const filterTypes = ["All", "Hackathon", "Conference", "Certification", "Competition"]

  const filteredAchievements =
    achievementFilter === "All"
      ? achievements
      : achievements.filter((achievement) => achievement.type === achievementFilter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Celine Khaw
            </h1>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group text-base font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              asChild
            >
              <Link
                href="https://www.canva.com/design/DAGo8KSmEkU/LGt7S8QVuwi294S9aF4SIA/edit?utm_content=DAGo8KSmEkU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Resume
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="text-center max-w-6xl mx-auto">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Profile Image */}

            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Khaw Tze Ern, Celine
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4 font-semibold tracking-wide">
              Computer Science (AI) Student | Software Engineer Intern | Web3 & AI Enthusiast
            </p>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
              "Exploring the edges of AI, blockchain, and software to shape tomorrow."
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="https://github.com/kteceline" target="_blank">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="mailto:leopardjiang03@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="https://www.linkedin.com/in/celine-khaw-a1433a237/" target="_blank">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Link>
              </Button>
            </div>
          </div>
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-purple-400" />
          </div>
        </div>
      </section>
 

      <div className="relative z-10">
        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30 hover:scale-105 transition-transform duration-300">
                  <div className="w-64 h-64 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full overflow-hidden border-2 border-purple-400/50">
                    <img src="/images/celine-profile.jpeg" alt="Celine Khaw" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-white leading-relaxed font-medium">
                  Hey there! 👋 I'm a tech enthusiast and IT student on the lookout for opportunities in the industry.
                  I'm all about diving into immersive experiences that let me explore the endless possibilities of
                  technology.
                </p>
                <p className="text-lg text-white leading-relaxed font-medium">
                  I've honed diverse skills like customer service, communication, and problem-solving. Put me in a
                  fast-paced environment, and watch me thrive—I'm all about embracing new challenges and tech like it's
                  second nature.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {["Curious", "Tech-Driven", "Communicative", "Resilient"].map((quality, index) => (
                    <div
                      key={quality}
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30 hover:scale-105 transition-transform duration-300"
                    >
                      <span className="text-purple-300 font-semibold text-lg">{quality}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white font-bold">Asia Pacific University</CardTitle>
                      <CardDescription className="text-gray-200 text-lg font-medium">
                        Degree in Computer Science (Artificial Intelligence)
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-base font-bold">
                      CGPA: 3.66
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-gray-200 font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>Year 2 Semester 1 • 2025 - Present</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-white font-bold">Asia Pacific University</CardTitle>
                      <CardDescription className="text-gray-200 text-lg font-medium">
                        Diploma in Software Engineering
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-base font-bold">
                      CGPA: 3.74
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-gray-200 font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>2022 - 2024  • 3 months internship</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/20 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-white font-bold">SMK Assunta</CardTitle>
                  <CardDescription className="text-gray-200 font-medium">Secondary Education</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-gray-200 font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>2017 - 2022</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Section */}
     
        

 
        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <Card
                    key={project.title}
                    className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                            {project.emoji}
                          </span>
                          <CardTitle className="text-white group-hover:text-purple-200 transition-colors duration-300 font-bold text-xl">
                            {project.title}
                          </CardTitle>
                        </div>
                        {project.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/20"
                            asChild
                          >
                            <Link href={project.link} target="_blank">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white mb-4 group-hover:text-gray-200 transition-colors duration-300 font-medium">
                        {project.description}
                      </p>
                      {project.contribution && (
                        <div className="mb-4 bg-purple-500/20 p-2 rounded-md">
                          <p className="text-white font-bold">
                            My Role: <span className="text-pink-300">{project.contribution}</span>
                          </p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-purple-500/20 text-white border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-300 font-medium"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <h3 className="text-2xl font-bold text-center my-12 text-white">Other Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => !p.featured)
                .map((project, index) => (
                  <Card
                    key={project.title}
                    className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                          {project.emoji}
                        </span>
                        <CardTitle className="text-white group-hover:text-purple-200 transition-colors duration-300 font-bold">
                          {project.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white mb-4 group-hover:text-gray-200 transition-colors duration-300 font-medium">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-purple-500/20 text-white border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-300 font-medium"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="relative">
              <div className="border-l-4 border-purple-500 absolute h-full left-6 top-0"></div>
              <div className="space-y-12 ml-12">
                {experiences.map((exp, index) => (
                  <div key={exp.title} className="relative">
                    <div className="absolute -left-7 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-purple-900"></div>
                    <div className={`bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30 p-6 rounded-xl shadow-lg transition-all duration-300 ${exp.current ? "ring-2 ring-purple-400" : ""}`}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="text-2xl text-white font-bold flex items-center">
                            {exp.title}
                            {exp.current && (
                              <Badge className="ml-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium">
                                Current
                              </Badge>
                            )}
                          </h3>
                          <p className="text-gray-200 text-lg font-medium">{exp.company}</p>
                        </div>
                        <Badge className="bg-purple-500/20 text-white border-purple-500/30 font-medium text-base">
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="text-white font-medium mt-2">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Certificates & Achievements
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filterTypes.map((type) => (
                <Button
                  key={type}
                  variant={achievementFilter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAchievementFilter(type)}
                  className={`${
                    achievementFilter === type
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                      : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  } transition-all duration-300 hover:scale-105 font-medium`}
                >
                  {type}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement, index) => (
                <Card
                  key={achievement.name}
                  className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 hover:scale-105 hover:border-purple-400/50 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${
                          achievement.type === "Hackathon"
                            ? "bg-purple-500/20 text-white"
                            : achievement.type === "Certification"
                              ? "bg-green-500/20 text-white"
                              : achievement.type === "Conference"
                                ? "bg-blue-500/20 text-white"
                                : "bg-orange-500/20 text-white"
                        } border-0 font-medium text-base`}
                      >
                        {achievement.type}
                      </Badge>
                      <span className="text-gray-200 text-sm font-medium">{achievement.year}</span>
                    </div>
                    <CardTitle className="text-white group-hover:text-purple-200 transition-colors duration-300 font-bold">
                      {achievement.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

    {/* Toolbox Section */}
      <Toolbox />
        {/* Clubs & Leadership */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Leadership & Community
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center font-bold">
                    <Users className="w-6 h-6 mr-3" />
                    APU Blockchain & Crypto Club
                  </CardTitle>
                  <CardDescription className="text-gray-200 text-lg font-medium">
                    Community Department Lead
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white font-medium">
                    Leading community initiatives and organizing blockchain-related events and workshops for students.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center font-bold">
                    <Trophy className="w-6 h-6 mr-3" />
                    APU Hacktheles
                  </CardTitle>
                  <CardDescription className="text-gray-200 text-lg font-medium">
                    Event Team Member & Emcee
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white font-medium">
                    Organizing and hosting hackathon events, facilitating networking and innovation among participants.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-white font-bold">leopardjiang03@gmail.com</p>
                    <p className="text-gray-300 text-sm">Personal Email</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-white font-bold">TP068056@mail.apu.edu.my</p>
                    <p className="text-gray-300 text-sm">University Email</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-white font-bold">+601139070118</p>
                    <p className="text-gray-300 text-sm">Mobile</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform duration-300">
                  <Linkedin className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-white font-bold">
                      <Link
                        href="https://www.linkedin.com/in/celine-khaw-a1433a237/"
                        target="_blank"
                        className="hover:text-purple-300 transition-colors"
                      >
                        linkedin.com/in/celine-khaw-a1433a237
                      </Link>
                    </p>
                    <p className="text-gray-300 text-sm">LinkedIn Profile</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Reference</h3>
                <div>
                  <p className="text-white font-bold">Jeffrey Jessely Sijore</p>
                  <p className="text-gray-300 font-medium">jeffrey.sijore@apu.edu.my</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/40 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-300 font-medium">
            &copy; 2025 Khaw Tze Ern, Celine. Built with passion and code.
            <span className="inline-block w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full ml-2"></span>
          </p>
        </div>
      </footer>
    </div>
  )
}
