"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, Target, TrendingUp, Calendar, Edit, Mail, Phone } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import DepartmentEmployees from "@/components/department-emloyees"
import DepartmentPerformanceMetrics from "@/components/department-performance-metrics"
import DepartmentActivities from "@/components/department-activites"
import DepartmentPerformanceTimeline from "@/components/department-performance-timeline"

// Dữ liệu mẫu cho phòng ban
const departments = [
  {
    id: 1,
    name: "Kinh doanh",
    code: "SALES",
    manager: "Nguyễn Văn A",
    managerAvatar: "NVA",
    managerEmail: "nguyenvana@vinfast.vn",
    managerPhone: "0912345678",
    employeeCount: 12,
    targetAmount: 15000000000,
    currentAmount: 12500000000,
    progress: 83,
    description: "Phòng ban chịu trách nhiệm về hoạt động kinh doanh và bán hàng của chi nhánh.",
    createdAt: "01/01/2022",
  },
  {
    id: 2,
    name: "Chăm sóc khách hàng",
    code: "CS",
    manager: "Trần Thị B",
    managerAvatar: "TTB",
    managerEmail: "tranthib@vinfast.vn",
    managerPhone: "0923456789",
    employeeCount: 8,
    targetAmount: 5000000000,
    currentAmount: 4200000000,
    progress: 84,
    description: "Phòng ban chịu trách nhiệm về chăm sóc khách hàng và dịch vụ sau bán hàng.",
    createdAt: "15/02/2022",
  },
  {
    id: 3,
    name: "Marketing",
    code: "MKT",
    manager: "Lê Văn C",
    managerAvatar: "LVC",
    managerEmail: "levanc@vinfast.vn",
    managerPhone: "0934567890",
    employeeCount: 5,
    targetAmount: 3000000000,
    currentAmount: 2100000000,
    progress: 70,
    description: "Phòng ban chịu trách nhiệm về hoạt động marketing và quảng bá thương hiệu.",
    createdAt: "01/03/2022",
  },
  {
    id: 4,
    name: "Hành chính",
    code: "ADMIN",
    manager: "Phạm Thị D",
    managerAvatar: "PTD",
    managerEmail: "phamthid@vinfast.vn",
    managerPhone: "0945678901",
    employeeCount: 4,
    targetAmount: 1000000000,
    currentAmount: 950000000,
    progress: 95,
    description: "Phòng ban chịu trách nhiệm về hoạt động hành chính và nhân sự của chi nhánh.",
    createdAt: "01/04/2022",
  },
]

export default function DepartmentDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const departmentId = Number(params.id)

  // Tìm phòng ban theo ID
  const department = departments.find((dept) => dept.id === departmentId)

  // Nếu không tìm thấy phòng ban, chuyển hướng về trang danh sách
  if (!department) {
    router.push("/departments")
    return null
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/departments")}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Quay lại</span>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{department.name}</h2>
          <p className="text-muted-foreground">Mã phòng ban: {department.code}</p>
        </div>
        <Button variant="outline" className="ml-auto">
          <Edit className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin phòng ban</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Mô tả</h3>
              <p className="text-sm text-muted-foreground">{department.description}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Ngày thành lập</h3>
              <p className="text-sm text-muted-foreground">{department.createdAt}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Số lượng nhân viên</h3>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{department.employeeCount} nhân viên</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trưởng phòng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={`/placeholder.svg?height=64&width=64&text=${department.managerAvatar}`}
                  alt={department.manager}
                />
                <AvatarFallback>{department.managerAvatar}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium">{department.manager}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{department.managerEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{department.managerPhone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chỉ tiêu & Hiệu suất</CardTitle>
          <CardDescription>Tiến độ hoàn thành chỉ tiêu của phòng ban</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Chỉ tiêu</div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">{formatCurrency(department.targetAmount)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Hiện tại</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-bold">{formatCurrency(department.currentAmount)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Tiến độ</div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${department.progress}%` }}
                  />
                </div>
                <span className="text-xl font-bold">{department.progress}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Nhân viên</TabsTrigger>
          <TabsTrigger value="metrics">Chỉ số hiệu suất</TabsTrigger>
          <TabsTrigger value="activities">Hoạt động gần đây</TabsTrigger>
          <TabsTrigger value="timeline">Biểu đồ theo thời gian</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <DepartmentEmployees departmentId={departmentId} />
        </TabsContent>

        <TabsContent value="metrics">
          <DepartmentPerformanceMetrics departmentId={departmentId} />
        </TabsContent>

        <TabsContent value="activities">
          <DepartmentActivities departmentId={departmentId} />
        </TabsContent>

        <TabsContent value="timeline">
          <DepartmentPerformanceTimeline departmentId={departmentId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

