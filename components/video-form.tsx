"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AnimatedButton from "@/components/animated-button";

const formSchema = z.object({
  videoUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine(
      (url) => {
        // Basic validation for YouTube, Vimeo, etc.
        return (
          url.includes("youtube.com") ||
          url.includes("youtu.be") ||
          url.includes("vimeo.com") ||
          url.includes("dailymotion.com")
        );
      },
      {
        message:
          "URL must be from a supported video platform (YouTube, Vimeo, etc.)",
      }
    ),
});

export default function VideoForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, this would call an API endpoint to start processing
      // For demo purposes, we'll simulate a delay and redirect to results
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Encode the URL to pass it safely in the URL
      const encodedUrl = encodeURIComponent(values.videoUrl);
      router.push(`/results?url=${encodedUrl}`);
    } catch (err) {
      setError(
        "An error occurred while processing your request. Please try again."
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-black">
                    <Link className="h-5 w-5" />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="h-12 text-base pl-10 border-zinc-200 focus-visible:ring-zinc-800 focus-visible:ring-2 focus-visible:ring-offset-2 hover:ring-1 font-mono"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormDescription className="text-primary-600/70 text-xs font-mono">
                  WORKS WITH YOUTUBE, VIMEO, AND OTHER MAJOR PLATFORMS
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <AnimatedButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
}
