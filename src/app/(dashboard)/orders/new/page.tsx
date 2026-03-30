"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { createOrder } from "../../actions"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function CreateOrderForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
      <div className="flex-1 w-full max-w-3xl">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-1">Welcome To The New Order Page</h2>
          <p className="text-sm text-gray-500">
            Enter the details for the new content writing order to begin processing.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Order Title</Label>
            <Input id="title" name="title" placeholder="e.g. Q3 SEO Blog Posts" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="content_type">Content Type</Label>
              <select
                id="content_type"
                name="content_type"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                required
              >
                <option value="blog_post">Blog Post</option>
                <option value="social_media">Social Media</option>
                <option value="website_copy">Website Copy</option>
                <option value="email">Email</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="word_count">Expected Word Count</Label>
              <Input id="word_count" name="word_count" type="number" placeholder="1000" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description / Brief</Label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary min-h-[100px]"
              placeholder="Describe the content requirements..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                name="priority"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input id="due_date" name="due_date" type="date" />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button formAction={createOrder} size="lg">
              Save Order
            </Button>
            <Button type="button" variant="ghost" size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* Right Sidebar / Order Settings */}
      <div className="w-full lg:w-80 shrink-0">
        <h3 className="text-lg font-bold mb-4">Order Settings</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 flex flex-col">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 border border-gray-100 shrink-0">
                    <span className="text-gray-500 text-xs">A</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">Auto-Approve</span>
                    <span className="text-xs text-gray-500">Automatically approve delivery</span>
                  </div>
                </div>
                <div className="flex items-center text-xs font-medium text-gray-400">
                  No <span className="ml-1 leading-none">&gt;</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 border border-gray-100 shrink-0">
                    <span className="text-gray-500 text-xs text-center leading-none">A/B</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">Include Variations</span>
                    <span className="text-xs text-gray-500">Request A/B testing copy</span>
                  </div>
                </div>
                <div className="flex items-center text-xs font-medium text-gray-400">
                  No <span className="ml-1 leading-none">&gt;</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CreateOrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateOrderForm />
    </Suspense>
  )
}
