"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Video,
  FileText,
  FileSearch,
  Play,
  Pause,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProcessingSteps() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Animation for the simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setAnimationStep((prev) => {
          const next = prev + 1;
          if (next > 6) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Step descriptions for narrative
  const stepDescriptions = [
    "Start by pasting a video URL",
    "URL validated and ready for processing",
    "Video identified and prepared for analysis",
    "AI processing the video content",
    "Transcript generated with timestamps",
    "Summary created from key points",
    "Process complete! Review your results",
  ];

  const steps = [
    {
      title: "PASTE VIDEO URL",
      description:
        "Simply paste any video URL from YouTube, Vimeo, or other platforms",
      icon: <Video className="h-6 w-6" />,
    },
    {
      title: "AI TRANSCRIPTION",
      description:
        "Our AI extracts and transcribes the audio with high accuracy",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "SMART SUMMARY",
      description: "Get a structured, concise summary of the key points",
      icon: <FileSearch className="h-6 w-6" />,
    },
  ];

  return (
    <div className="relative py-8">
      {/* Steps */}
      <div className="relative grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <Card className="h-full p-6 border border-zinc-100 overflow-hidden shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-black text-white">
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold mb-2 text-primary-900 font-mono">
                  {step.title}
                </h3>
                <p className="text-primary-700 text-sm">{step.description}</p>
              </div>
            </Card>

            {/* Connecting arrow for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1C4 5.33333 4 10.6667 1 15"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Demo */}
      <div className="mt-16 p-6 rounded-xl border border-green-100 bg-white shadow-md overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-primary-900 font-mono">
            INTERACTIVE DEMO
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="border-green-200 text-primary-900 hover:bg-green-50 font-mono"
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying && animationStep === 6) {
                setAnimationStep(0);
              }
            }}
          >
            <span className="flex items-center">
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  PAUSE
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  {animationStep === 0 ? "START" : "RESUME"}
                </>
              )}
            </span>
          </Button>
        </div>

        {/* Narrative description */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
            <span className="text-sm font-medium text-primary-900 font-mono">
              CURRENT STAGE
            </span>
          </div>
          <div className="p-4 bg-gradient-to-r from-black to-black/90 text-white rounded-lg font-mono text-sm text-center shadow-sm border border-black/10">
            {stepDescriptions[animationStep]}
          </div>
        </div>

        {/* Demo Container */}
        <div className="relative h-[450px] bg-gradient-to-br from-green-50/80 to-white rounded-lg overflow-hidden border border-green-100 shadow-sm">
          {/* Step 1-2: Video URL Input */}
          <AnimatePresence>
            {animationStep <= 2 && (
              <motion.div
                key="url-input"
                className="absolute top-12 left-1/2 transform -translate-x-1/2 w-[400px] max-w-[90%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-sm p-4 border border-green-100">
                  <div className="flex items-center mb-2">
                    <Video className="h-4 w-4 text-black mr-2" />
                    <span className="text-sm font-medium text-primary-900 font-mono">
                      VIDEO URL
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-full font-mono text-xs bg-green-50 p-3 rounded ${
                        animationStep === 0 ? "typing-effect" : ""
                      }`}
                    >
                      https://www.youtube.com/watch?v=example
                    </div>
                  </div>
                </div>

                {/* Validation indicator */}
                {animationStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center justify-center text-xs font-mono text-green-700 bg-green-100 p-2 rounded"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" /> URL validated
                    successfully
                  </motion.div>
                )}

                {/* Arrow pointing to video */}
                {animationStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -right-16 top-1/2 transform -translate-y-1/2"
                  >
                    <ArrowRight className="h-6 w-6 text-black" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2-3: Video Preview */}
          <AnimatePresence>
            {animationStep >= 2 && animationStep <= 4 && (
              <motion.div
                key="video-preview"
                className="absolute top-12 right-8 w-[240px] aspect-video"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative bg-black rounded-md overflow-hidden shadow-sm border border-green-200">
                  {/* Video thumbnail with play button overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-30 bg-[url('/placeholder.svg?height=180&width=320')]"></div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Video title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                    <div className="text-white text-xs font-mono truncate">
                      Example Video Title
                    </div>
                  </div>
                </div>

                {/* Video identified indicator */}
                {animationStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex items-center justify-center text-xs font-mono text-green-700 bg-green-100 p-1 rounded"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" /> Video identified
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Processing Animation */}
          <AnimatePresence>
            {animationStep === 3 && (
              <motion.div
                key="processing"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    {/* Outer rotating ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-black/10"
                      style={{ borderTopColor: "black" }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    {/* Inner container */}
                    <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Brain className="h-10 w-10 text-black" />
                      </motion.div>
                    </div>
                  </div>
                  <span className="mt-4 text-sm font-bold text-primary-900 font-mono">
                    AI PROCESSING
                  </span>

                  {/* Processing steps with progress bars */}
                  <div className="mt-4 space-y-3 text-xs font-mono w-64">
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                          <span>Extracting audio</span>
                        </div>
                        <span className="text-green-600">100%</span>
                      </div>
                      <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-green-600"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="h-3 w-3 border-2 border-black border-t-transparent rounded-full mr-1"
                          />
                          <span>Converting speech to text</span>
                        </div>
                        <span>65%</span>
                      </div>
                      <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-black"
                          initial={{ width: "0%" }}
                          animate={{ width: "65%" }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full border border-black/40 mr-1" />
                          <span className="text-black/40">
                            Analyzing content
                          </span>
                        </div>
                        <span className="text-black/40">Waiting...</span>
                      </div>
                      <div className="h-1 w-full bg-black/5 rounded-full" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4-6: Transcript */}
          <AnimatePresence>
            {animationStep >= 4 && (
              <motion.div
                key="transcript"
                className="absolute top-12 left-8 w-[45%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-sm p-4 border border-green-100">
                  <div className="flex items-center mb-3">
                    <FileText className="h-4 w-4 text-black mr-2" />
                    <span className="text-sm font-medium text-primary-900 font-mono">
                      TRANSCRIPT
                    </span>
                  </div>
                  <div className="h-[240px] overflow-hidden">
                    <div className="font-mono text-xs leading-relaxed text-primary-800 space-y-2">
                      <motion.div
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="text-black mr-2 font-bold">
                          [00:00]
                        </span>
                        <span>Hello and welcome to this video...</span>
                      </motion.div>
                      <motion.div
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-black mr-2 font-bold">
                          [00:10]
                        </span>
                        <span>Today we&apos;ll discuss the main points...</span>
                      </motion.div>
                      <motion.div
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-black mr-2 font-bold">
                          [00:20]
                        </span>
                        <span>
                          First, let&apos;s look at the key concepts...
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="text-black mr-2 font-bold">
                          [00:30]
                        </span>
                        <span>The most important aspect is...</span>
                      </motion.div>
                      <motion.div
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="text-black mr-2 font-bold">
                          [00:40]
                        </span>
                        <span>In conclusion, we&apos;ve learned that...</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 5-6: Summary */}
          <AnimatePresence>
            {animationStep >= 5 && (
              <motion.div
                key="summary"
                className="absolute top-12 right-8 w-[45%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-sm p-4 border border-green-100">
                  <div className="flex items-center mb-3">
                    <FileSearch className="h-4 w-4 text-black mr-2" />
                    <span className="text-sm font-medium text-primary-900 font-mono">
                      SUMMARY
                    </span>
                  </div>
                  <div className="h-[200px] overflow-hidden">
                    <div className="text-xs leading-relaxed text-primary-800 font-mono">
                      <motion.h4
                        className="font-bold text-sm mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        Key Points:
                      </motion.h4>
                      <ul className="space-y-2">
                        <motion.li
                          className="flex items-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <CheckCircle className="h-3 w-3 text-black mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            The video introduces fundamental concepts about the
                            topic
                          </span>
                        </motion.li>
                        <motion.li
                          className="flex items-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <CheckCircle className="h-3 w-3 text-black mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Several important aspects are highlighted,
                            including...
                          </span>
                        </motion.li>
                        <motion.li
                          className="flex items-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <CheckCircle className="h-3 w-3 text-black mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            The conclusion summarizes the main takeaways
                          </span>
                        </motion.li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Completion indicator on final step */}
                {animationStep === 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 mb-16 flex items-center justify-center text-xs font-mono text-green-700 bg-green-100 p-2 rounded-lg shadow-sm"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" /> Process complete!
                    Ready to use
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    step <= animationStep
                      ? "w-8 bg-black shadow-sm"
                      : "w-2 bg-black/20"
                  }`}
                />
              ))}
            </div>
            <div className="text-xs font-mono text-primary-700 bg-white/80 px-3 py-1.5 rounded-full border border-black/10 shadow-sm">
              {animationStep + 1}/7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
