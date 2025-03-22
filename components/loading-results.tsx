export default function LoadingResults() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-green-100 p-4 bg-white shadow-md">
          <div className="h-5 w-1/3 bg-green-200/60 rounded animate-pulse mb-4"></div>
          <div className="aspect-video bg-green-100/50 rounded animate-pulse mb-6"></div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="h-9 bg-green-100/70 rounded animate-pulse w-1/2"></div>
              <div className="h-9 bg-green-100/70 rounded animate-pulse w-1/2"></div>
            </div>
            <div className="h-9 bg-green-100/70 rounded animate-pulse w-full"></div>
            <div className="pt-4 border-t border-green-100">
              <div className="h-4 bg-green-100/70 rounded animate-pulse w-1/3 mb-2"></div>
              <div className="flex gap-2">
                <div className="h-9 bg-green-100/70 rounded animate-pulse w-16"></div>
                <div className="h-9 bg-green-100/70 rounded animate-pulse w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-green-300/60 rounded-full animate-pulse"></div>
            <div className="h-6 bg-green-200/60 rounded animate-pulse w-40"></div>
          </div>
          <div className="h-10 bg-green-100/70 rounded animate-pulse"></div>
          <div className="rounded-lg border border-green-100 p-6 bg-white shadow-md">
            <div className="space-y-4">
              <div className="h-6 bg-green-200/60 rounded animate-pulse w-1/4"></div>
              <div className="h-4 bg-green-200/60 rounded animate-pulse"></div>
              <div className="h-4 bg-green-200/60 rounded animate-pulse"></div>
              <div className="h-4 bg-green-200/60 rounded animate-pulse w-3/4"></div>
              <div className="h-6 bg-green-200/60 rounded animate-pulse w-1/3 mt-6"></div>
              <div className="h-4 bg-green-200/60 rounded animate-pulse"></div>
              <div className="h-4 bg-green-200/60 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

