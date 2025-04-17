"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "@/components/chart"

// Dữ liệu mẫu cho biểu đồ hiệu suất theo thời gian
const departmentTimelineData: Record<
  number,
  {
    monthly: { name: string; "Doanh số": number; "Chỉ tiêu": number }[]
    quarterly: { name: string; "Doanh số": number; "Chỉ tiêu": number }[]
    yearly: { name: string; "Doanh số": number; "Chỉ tiêu": number }[]
  }
> = {
  1: {
    monthly: [
      { name: "Tuần 1", "Doanh số": 1000, "Chỉ tiêu": 1200 },
      { name: "Tuần 2", "Doanh số": 1200, "Chỉ tiêu": 1200 },
      { name: "Tuần 3", "Doanh số": 900, "Chỉ tiêu": 1200 },
      { name: "Tuần 4", "Doanh số": 1100, "Chỉ tiêu": 1200 },
    ],
    quarterly: [
      { name: "Tháng 1", "Doanh số": 4000, "Chỉ tiêu": 5000 },
      { name: "Tháng 2", "Doanh số": 4200, "Chỉ tiêu": 5000 },
      { name: "Tháng 3", "Doanh số": 4300, "Chỉ tiêu": 5000 },
    ],
    yearly: [
      { name: "Q1", "Doanh số": 12500, "Chỉ tiêu": 15000 },
      { name: "Q2", "Doanh số": 13000, "Chỉ tiêu": 15000 },
      { name: "Q3", "Doanh số": 10000, "Chỉ tiêu": 15000 },
      { name: "Q4", "Doanh số": 9500, "Chỉ tiêu": 15000 },
    ],
  },
  2: {
    monthly: [
      { name: "Tuần 1", "Doanh số": 300, "Chỉ tiêu": 400 },
      { name: "Tuần 2", "Doanh số": 350, "Chỉ tiêu": 400 },
      { name: "Tuần 3", "Doanh số": 380, "Chỉ tiêu": 400 },
      { name: "Tuần 4", "Doanh số": 370, "Chỉ tiêu": 400 },
    ],
    quarterly: [
      { name: "Tháng 1", "Doanh số": 1300, "Chỉ tiêu": 1700 },
      { name: "Tháng 2", "Doanh số": 1400, "Chỉ tiêu": 1700 },
      { name: "Tháng 3", "Doanh số": 1500, "Chỉ tiêu": 1700 },
    ],
    yearly: [
      { name: "Q1", "Doanh số": 4200, "Chỉ tiêu": 5000 },
      { name: "Q2", "Doanh số": 4500, "Chỉ tiêu": 5000 },
      { name: "Q3", "Doanh số": 3800, "Chỉ tiêu": 5000 },
      { name: "Q4", "Doanh số": 3500, "Chỉ tiêu": 5000 },
    ],
  },
  3: {
    monthly: [
      { name: "Tuần 1", "Doanh số": 200, "Chỉ tiêu": 250 },
      { name: "Tuần 2", "Doanh số": 180, "Chỉ tiêu": 250 },
      { name: "Tuần 3", "Doanh số": 220, "Chỉ tiêu": 250 },
      { name: "Tuần 4", "Doanh số": 240, "Chỉ tiêu": 250 },
    ],
    quarterly: [
      { name: "Tháng 1", "Doanh số": 800, "Chỉ tiêu": 1000 },
      { name: "Tháng 2", "Doanh số": 700, "Chỉ tiêu": 1000 },
      { name: "Tháng 3", "Doanh số": 900, "Chỉ tiêu": 1000 },
    ],
    yearly: [
      { name: "Q1", "Doanh số": 2400, "Chỉ tiêu": 3000 },
      { name: "Q2", "Doanh số": 2100, "Chỉ tiêu": 3000 },
      { name: "Q3", "Doanh số": 2200, "Chỉ tiêu": 3000 },
      { name: "Q4", "Doanh số": 1900, "Chỉ tiêu": 3000 },
    ],
  },
  4: {
    monthly: [
      { name: "Tuần 1", "Doanh số": 80, "Chỉ tiêu": 100 },
      { name: "Tuần 2", "Doanh số": 90, "Chỉ tiêu": 100 },
      { name: "Tuần 3", "Doanh số": 85, "Chỉ tiêu": 100 },
      { name: "Tuần 4", "Doanh số": 95, "Chỉ tiêu": 100 },
    ],
    quarterly: [
      { name: "Tháng 1", "Doanh số": 300, "Chỉ tiêu": 350 },
      { name: "Tháng 2", "Doanh số": 320, "Chỉ tiêu": 350 },
      { name: "Tháng 3", "Doanh số": 330, "Chỉ tiêu": 350 },
    ],
    yearly: [
      { name: "Q1", "Doanh số": 950, "Chỉ tiêu": 1000 },
      { name: "Q2", "Doanh số": 980, "Chỉ tiêu": 1000 },
      { name: "Q3", "Doanh số": 920, "Chỉ tiêu": 1000 },
      { name: "Q4", "Doanh số": 950, "Chỉ tiêu": 1000 },
    ],
  },
}

type DepartmentPerformanceTimelineProps = {
  departmentId: number
}

export default function DepartmentPerformanceTimeline({ departmentId }: DepartmentPerformanceTimelineProps) {
  const timelineData = departmentTimelineData[departmentId] || {
    monthly: [],
    quarterly: [],
    yearly: [],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ hiệu suất theo thời gian</CardTitle>
        <CardDescription>Theo dõi hiệu suất của phòng ban theo thời gian</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Tháng này</TabsTrigger>
            <TabsTrigger value="quarterly">Quý này</TabsTrigger>
            <TabsTrigger value="yearly">Năm nay</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={timelineData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} triệu VNĐ`} />
                <Legend />
                <Line type="monotone" dataKey="Doanh số" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="Chỉ tiêu" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="quarterly">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={timelineData.quarterly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} triệu VNĐ`} />
                <Legend />
                <Line type="monotone" dataKey="Doanh số" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="Chỉ tiêu" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="yearly">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={timelineData.yearly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} triệu VNĐ`} />
                <Legend />
                <Line type="monotone" dataKey="Doanh số" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="Chỉ tiêu" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
