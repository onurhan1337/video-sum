import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VideoIcon, ArrowRight, Sparkles } from "lucide-react";
import VideoForm from "@/components/video-form";
import ProcessingSteps from "@/components/processing-steps";
import GradientText from "@/components/ui/gradient-text";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16">
        <section className="py-12 md:py-24 bg-gradient-to-b from-zinc-50 via-zinc-100/30 to-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-[10%] w-72 h-72 bg-gradient-to-br from-zinc-200/20 to-zinc-400/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-zinc-300/10 to-zinc-100/5 blur-3xl"></div>
            <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-zinc-300/40 rounded-full"></div>
            <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-zinc-400/30 rounded-full"></div>
          </div>

          <div className="container max-w-7xl mx-auto px-4 md:px-6 relative">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-primary-900 text-sm font-mono">
                  <Sparkles className="h-4 w-4" />
                  <span>AI-POWERED VIDEO ANALYSIS</span>
                </div>

                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-900 font-mono">
                  Transform Videos into Concise Summaries
                </h1>

                <p className="text-primary-800 md:text-xl font-mono">
                  Paste any video URL and get an AI-generated transcript and
                  summary in seconds.
                </p>

                <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                  <ArrowRight className="h-5 w-5 text-black" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium font-mono">
                      <GradientText animationSpeed={3}>
                        NO ACCOUNT REQUIRED. JUST PASTE AND GO
                      </GradientText>
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:pl-10">
                <Card className="p-6 shadow-xl border-zinc-100 bg-white/80 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent pointer-events-none"></div>

                  <div className="relative">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="rounded-full bg-black p-1.5">
                        <VideoIcon className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-medium text-primary-900 font-mono">
                        ENTER VIDEO URL
                      </h3>
                    </div>

                    <Suspense fallback={<div>Loading form...</div>}>
                      <VideoForm />
                    </Suspense>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-16 md:py-24 border-t border-zinc-100"
        >
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-primary-900 font-mono">
                HOW IT WORKS
              </h2>
              <p className="text-primary-800 text-lg font-mono">
                THREE SIMPLE STEPS TO UNLOCK THE CONTENT OF ANY VIDEO
              </p>
            </div>

            <ProcessingSteps />
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gradient-to-br from-primary-800 to-primary-900 bg-zinc-900 text-white">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4 font-mono">
              READY TO TRY IT YOURSELF?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto font-mono">
              PASTE ANY YOUTUBE, VIMEO, OR OTHER VIDEO URL AND SEE THE MAGIC
              HAPPEN.
            </p>
            <Button
              size="lg"
              className="font-medium bg-white text-zinc-900 hover:bg-zinc-50 hover:text-zinc-900 font-mono"
              asChild
            >
              <Link href="#">GET STARTED</Link>
            </Button>
          </div>
        </section>
        <p className="text-center text-sm text-white/80 font-mono bg-zinc-900 pb-4">
          © 2025 VIDEO-SUM. MADE WITH AI.
        </p>
      </main>
    </div>
  );
}
