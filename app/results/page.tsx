import { Suspense } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, ThumbsUp, ThumbsDown, VideoIcon, Sparkles } from "lucide-react"
import VideoPlayer from "@/components/video-player"
import TranscriptView from "@/components/transcript-view"
import SummaryView from "@/components/summary-view"
import LoadingResults from "@/components/loading-results"
import DynamicNavbar from "@/components/dynamic-navbar"

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { url?: string }
}) {
  const videoUrl = searchParams.url ? decodeURIComponent(searchParams.url) : null

  if (!videoUrl) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary-800">No Video URL Provided</h2>
        <p className="mb-6 text-primary-600">Please return to the home page and submit a video URL.</p>
        <Button asChild className="bg-primary-800 hover:bg-primary-900">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50/50 to-background">
      <DynamicNavbar />

      <main className="flex-1 container py-8 pt-20">
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-green-200 text-primary-800 hover:bg-green-50 hover:text-primary-900 font-mono"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              NEW VIDEO
            </Link>
          </Button>
        </div>

        <Suspense fallback={<LoadingResults />}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card className="p-4 border-green-100 bg-white shadow-md overflow-hidden relative">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent pointer-events-none"></div>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-green-100 rounded-full p-1">
                      <VideoIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <h2 className="text-lg font-medium text-primary-800">Video Preview</h2>
                  </div>

                  <VideoPlayer url={videoUrl} />

                  <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-green-200 text-primary-800 hover:bg-green-50 font-mono text-xs"
                      >
                        <Download className="h-4 w-4" />
                        DOWNLOAD TRANSCRIPT
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-green-200 text-primary-800 hover:bg-green-50 font-mono text-xs"
                      >
                        <Download className="h-4 w-4" />
                        DOWNLOAD SUMMARY
                      </Button>
                    </div>

                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2 border-green-200 text-primary-800 hover:bg-green-50 font-mono text-xs"
                      >
                        <Share2 className="h-4 w-4" />
                        SHARE RESULTS
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-green-100">
                      <h3 className="text-sm font-medium mb-2 text-primary-800">Was this helpful?</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 border-green-200 text-primary-800 hover:bg-green-50"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Yes
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 border-green-200 text-primary-800 hover:bg-green-50"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          No
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-green-500" />
                <h2 className="text-xl font-bold text-primary-800">AI-Generated Results</h2>
              </div>

              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-green-100 p-1">
                  <TabsTrigger
                    value="summary"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary-800 data-[state=active]:shadow-sm text-primary-700 font-mono"
                  >
                    SUMMARY
                  </TabsTrigger>
                  <TabsTrigger
                    value="transcript"
                    className="data-[state=active]:bg-white data-[state=active]:text-primary-800 data-[state=active]:shadow-sm text-primary-700 font-mono"
                  >
                    FULL TRANSCRIPT
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="mt-4">
                  <Card className="p-6 border-green-100 bg-white shadow-md">
                    <SummaryView videoUrl={videoUrl} />
                  </Card>
                </TabsContent>
                <TabsContent value="transcript" className="mt-4">
                  <Card className="p-6 border-green-100 bg-white shadow-md">
                    <TranscriptView videoUrl={videoUrl} />
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Suspense>
      </main>

      <footer className="border-t border-green-100 py-6 bg-gradient-to-b from-background to-green-50/30">
        <div className="container flex justify-center">
          <p className="text-sm text-primary-700 font-mono">© 2024 VIDIFY. MADE WITH AI.</p>
        </div>
      </footer>
    </div>
  )
}

