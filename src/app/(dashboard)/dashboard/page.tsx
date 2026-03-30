import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, PlayCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import type { Order } from '@/types/database'
import { DashboardChart } from '@/components/dashboard/chart'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch order counts by status
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const allOrders = (orders || []) as Order[]
  const totalOrders = allOrders.length
  const pending = allOrders.filter(o => o.status === 'pending').length
  const inProgress = allOrders.filter(o => o.status === 'in_progress').length
  const completed = allOrders.filter(o => o.status === 'completed').length
  const recentOrders = allOrders.slice(0, 5)

  // Build monthly chart data
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const chartData = monthNames.map(name => ({
    name,
    orders: allOrders.filter(o => {
      const d = new Date(o.created_at)
      return monthNames[d.getMonth()] === name
    }).length,
  }))

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <PlayCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completed}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardChart data={chartData} />
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No orders yet. Create your first order!</p>
            ) : (
              <div className="space-y-6">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <Link href={`/orders/${order.id}`} className="text-sm font-medium hover:underline">
                        {order.title}
                      </Link>
                      <span className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Badge variant={
                      order.status === 'completed' ? 'success' :
                      order.status === 'in_progress' ? 'default' :
                      order.status === 'review' ? 'warning' :
                      order.status === 'revision' ? 'destructive' : 'secondary'
                    }>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
