"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Target, DollarSign } from "lucide-react"

type Metric = {
  name: string
  value: string | number
  change: number
  target: string | number
  progress: number
  icon: React.ReactNode
}

// Dữ liệu mẫu cho các chỉ số hiệu suất theo phòng ban
const departmentMetrics: Record<number, { monthly: Metric[]; quarterly: Metric[]; yearly: Metric[] }> = {
  1: {
    monthly: [
      {
        name: "Doanh số",
        value: "4.2 tỷ",
        change: 12,
        target: "5 tỷ",
        progress: 84,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng mới",
        value: 85,
        change: 8,
        target: 100,
        progress: 85,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ chuyển đổi",
        value: "24.5%",
        change: 2.5,
        target: "30%",
        progress: 82,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Đơn hàng hoàn thành",
        value: 42,
        change: 15,
        target: 50,
        progress: 84,
        icon: <Target className="h-4 w-4" />,
      },
    ],
    quarterly: [
      {
        name: "Doanh số",
        value: "12.5 tỷ",
        change: 8,
        target: "15 tỷ",
        progress: 83,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng mới",
        value: 245,
        change: 5,
        target: 300,
        progress: 82,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ chuyển đổi",
        value: "26.2%",
        change: 1.8,
        target: "30%",
        progress: 87,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Đơn hàng hoàn thành",
        value: 125,
        change: 10,
        target: 150,
        progress: 83,
        icon: <Target className="h-4 w-4" />,
      },
    ],
    yearly: [
      {
        name: "Doanh số",
        value: "45 tỷ",
        change: 15,
        target: "60 tỷ",
        progress: 75,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng mới",
        value: 850,
        change: 12,
        target: 1200,
        progress: 71,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ chuyển đổi",
        value: "25.8%",
        change: 3.2,
        target: "30%",
        progress: 86,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Đơn hàng hoàn thành",
        value: 450,
        change: 18,
        target: 600,
        progress: 75,
        icon: <Target className="h-4 w-4" />,
      },
    ],
  },
  2: {
    monthly: [
      {
        name: "Doanh số",
        value: "1.4 tỷ",
        change: 5,
        target: "1.7 tỷ",
        progress: 82,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng mới",
        value: 45,
        change: 3,
        target: 50,
        progress: 90,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ hài lòng",
        value: "92%",
        change: 2,
        target: "95%",
        progress: 97,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Yêu cầu hỗ trợ",
        value: 120,
        change: -5,
        target: 100,
        progress: 83,
        icon: <Target className="h-4 w-4" />,
      },
    ],
    quarterly: [
      {
        name: "Doanh số",
        value: "4.2 tỷ",
        change: 8,
        target: "5 tỷ",
        progress: 84,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng mới",
        value: 135,
        change: 7,
        target: 150,
        progress: 90,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ hài lòng",
        value: "91%",
        change: 1,
        target: "95%",
        progress: 96,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Yêu cầu hỗ trợ",
        value: 350,
        change: -8,
        target: 300,
        progress: 85,
        icon: <Target className="h-4 w-4" />,
      },
    ],
    yearly: [
      {
        name: "Doanh số",
        value: "16 tỷ",
        change: 12,
        target: "20 tỷ",
        progress: 80,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng mới",
        value: 520,
        change: 15,
        target: 600,
        progress: 87,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ hài lòng",
        value: "90%",
        change: 5,
        target: "95%",
        progress: 95,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Yêu cầu hỗ trợ",
        value: 1200,
        change: -10,
        target: 1000,
        progress: 83,
        icon: <Target className="h-4 w-4" />,
      },
    ],
  },
  3: {
    monthly: [
      {
        name: "Chi phí marketing",
        value: "0.7 tỷ",
        change: -3,
        target: "0.8 tỷ",
        progress: 88,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng tiềm năng",
        value: 120,
        change: 15,
        target: 150,
        progress: 80,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ chuyển đổi",
        value: "18%",
        change: 2,
        target: "20%",
        progress: 90,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Chiến dịch hoàn thành",
        value: 5,
        change: 1,
        target: 6,
        progress: 83,
        icon: <Target className="h-4 w-4" />,
      },
    ],
    quarterly: [
      {
        name: "Chi phí marketing",
        value: "2.1 tỷ",
        change: -5,
        target: "2.4 tỷ",
        progress: 88,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng tiềm năng",
        value: 350,
        change: 12,
        target: 400,
        progress: 88,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ chuyển đổi",
        value: "17.5%",
        change: 1.5,
        target: "20%",
        progress: 88,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Chiến dịch hoàn thành",
        value: 15,
        change: 2,
        target: 18,
        progress: 83,
        icon: <Target className="h-4 w-4" />,
      },
    ],
    yearly: [
      {
        name: "Chi phí marketing",
        value: "8.4 tỷ",
        change: -8,
        target: "10 tỷ",
        progress: 84,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Khách hàng tiềm năng",
        value: 1200,
        change: 20,
        target: 1500,
        progress: 80,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ chuyển đổi",
        value: "16.8%",
        change: 3.2,
        target: "20%",
        progress: 84,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Chiến dịch hoàn thành",
        value: 60,
        change: 5,
        target: 72,
        progress: 83,
        icon: <Target className="h-4 w-4" />,
      },
    ],
  },
  4: {
    monthly: [
      {
        name: "Chi phí vận hành",
        value: "0.3 tỷ",
        change: -2,
        target: "0.35 tỷ",
        progress: 86,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Nhân viên mới",
        value: 2,
        change: 0,
        target: 2,
        progress: 100,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ hài lòng nhân viên",
        value: "95%",
        change: 3,
        target: "95%",
        progress: 100,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Yêu cầu hành chính",
        value: 45,
        change: -5,
        target: 40,
        progress: 89,
        icon: <Target className="h-4 w-4" />,
      },
    ],
    quarterly: [
      {
        name: "Chi phí vận hành",
        value: "0.95 tỷ",
        change: -3,
        target: "1 tỷ",
        progress: 95,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Nhân viên mới",
        value: 5,
        change: 1,
        target: 5,
        progress: 100,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ hài lòng nhân viên",
        value: "93%",
        change: 2,
        target: "95%",
        progress: 98,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Yêu cầu hành chính",
        value: 130,
        change: -8,
        target: 120,
        progress: 92,
        icon: <Target className="h-4 w-4" />,
      },
    ],
    yearly: [
      {
        name: "Chi phí vận hành",
        value: "3.8 tỷ",
        change: -5,
        target: "4 tỷ",
        progress: 95,
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Nhân viên mới",
        value: 15,
        change: 3,
        target: 20,
        progress: 75,
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Tỷ lệ hài lòng nhân viên",
        value: "92%",
        change: 4,
        target: "95%",
        progress: 97,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        name: "Yêu cầu hành chính",
        value: 520,
        change: -10,
        target: 480,
        progress: 92,
        icon: <Target className="h-4 w-4" />,
      },
    ],
  },
}

type DepartmentPerformanceMetricsProps = {
  departmentId: number
}

export default function DepartmentPerformanceMetrics({ departmentId }: DepartmentPerformanceMetricsProps) {
  const metrics = departmentMetrics[departmentId] || { monthly: [], quarterly: [], yearly: [] }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chỉ số hiệu suất</CardTitle>
        <CardDescription>Các chỉ số hiệu suất chính của phòng ban</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="monthly">Tháng này</TabsTrigger>
            <TabsTrigger value="quarterly">Quý này</TabsTrigger>
            <TabsTrigger value="yearly">Năm nay</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metrics.monthly.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    <div className="h-4 w-4 text-muted-foreground">{metric.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">Mục tiêu: {metric.target}</p>
                      <div
                        className={`flex items-center text-xs ${
                          metric.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {metric.change >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                    <Progress value={metric.progress} className="mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quarterly" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metrics.quarterly.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    <div className="h-4 w-4 text-muted-foreground">{metric.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">Mục tiêu: {metric.target}</p>
                      <div
                        className={`flex items-center text-xs ${
                          metric.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {metric.change >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                    <Progress value={metric.progress} className="mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metrics.yearly.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    <div className="h-4 w-4 text-muted-foreground">{metric.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">Mục tiêu: {metric.target}</p>
                      <div
                        className={`flex items-center text-xs ${
                          metric.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {metric.change >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                    <Progress value={metric.progress} className="mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
