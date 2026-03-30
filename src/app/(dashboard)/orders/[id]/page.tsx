import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Order } from '@/types/database'
import { ArrowLeft } from 'lucide-react'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !order) {
    notFound()
  }

  const typedOrder = order as Order

  const statusSteps = ['pending', 'in_progress', 'review', 'revision', 'completed']
  const currentIdx = statusSteps.indexOf(typedOrder.status)

  return (
    <div className="max-w-4xl flex flex-col gap-8">
      <Link href="/orders" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{typedOrder.title}</h2>
          <p className="text-sm text-gray-500 mt-1">Created {new Date(typedOrder.created_at).toLocaleDateString()}</p>
        </div>
        <Badge variant={
          typedOrder.status === 'completed' ? 'success' :
          typedOrder.status === 'in_progress' ? 'default' :
          typedOrder.status === 'review' ? 'warning' :
          typedOrder.status === 'revision' ? 'destructive' : 'secondary'
        } className="text-sm px-3 py-1">
          {typedOrder.status.replace('_', ' ')}
        </Badge>
      </div>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-medium shrink-0 ${
                  i <= currentIdx ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  {i + 1}
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 ${
                    i < currentIdx ? 'bg-brand-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {statusSteps.map((step) => (
              <span key={step} className="text-xs text-gray-500 capitalize">{step.replace('_', ' ')}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt className="text-sm font-medium text-gray-500">Content Type</dt>
              <dd className="mt-1 text-sm capitalize">{typedOrder.content_type.replace('_', ' ')}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Priority</dt>
              <dd className="mt-1 text-sm capitalize">{typedOrder.priority}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Word Count</dt>
              <dd className="mt-1 text-sm">{typedOrder.word_count || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
              <dd className="mt-1 text-sm">
                {typedOrder.due_date ? new Date(typedOrder.due_date).toLocaleDateString() : '—'}
              </dd>
            </div>
            {typedOrder.description && (
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm whitespace-pre-wrap">{typedOrder.description}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
