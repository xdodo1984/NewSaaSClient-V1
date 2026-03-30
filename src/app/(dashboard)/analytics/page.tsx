import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>Detailed insights into your content orders and performance.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center border-t border-gray-100 bg-gray-50/50">
          <p className="text-gray-500">Analytics charts will appear here as more data accumulates.</p>
        </CardContent>
      </Card>
    </div>
  )
}
