"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter } from "lucide-react"
import type { Order } from '@/types/database'

export function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [search, setSearch] = useState("")

  const filteredOrders = initialOrders.filter(order =>
    order.title.toLowerCase().includes(search.toLowerCase()) ||
    order.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search orders..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Link href="/orders/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Order
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden flex-1">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <p className="text-lg font-medium mb-2">No orders found</p>
            <p className="text-sm">Create your first order to get started.</p>
            <Link href="/orders/new" className="mt-4">
              <Button className="gap-2"><Plus className="h-4 w-4" /> New Order</Button>
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Order Title</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium text-right">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-900">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium">
                    <Link href={`/orders/${order.id}`} className="hover:underline">{order.title}</Link>
                  </td>
                  <td className="px-6 py-4 text-gray-500 capitalize">{order.content_type.replace('_', ' ')}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      order.status === 'completed' ? 'success' :
                      order.status === 'in_progress' ? 'default' :
                      order.status === 'review' ? 'warning' :
                      order.status === 'revision' ? 'destructive' : 'secondary'
                    }>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-500">{order.priority}</td>
                  <td className="px-6 py-4 text-right text-gray-500">
                    {order.due_date ? new Date(order.due_date).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
