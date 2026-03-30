import { createClient } from '@/lib/supabase/server'
import { OrdersTable } from '@/components/orders/orders-table'
import type { Order } from '@/types/database'

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return <OrdersTable initialOrders={(orders || []) as Order[]} />
}
