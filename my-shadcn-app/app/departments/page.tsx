"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Target, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DepartmentPerformanceChart from "@/components/department-perfomance-chart"
import AddDepartmentModal from "@/components/add-department-modal"

type Department = { 
  id: number
  name: string
  code: string
  manager: string
  managerAvatar: string
  employeeCount: number
  targetAmount: number
  currentAmount: number
  progress: number
}

const departments: Department[] = [
  {
    id: 1,
    name: "Kinh doanh",
    code: "SALES",
    manager: "Nguyễn Văn A",
    managerAvatar: "NVA",
    employeeCount: 12,
    targetAmount: 15000000000,
    currentAmount: 12500000000,
    progress: 83,
  },
  {
    id: 2,
    name: "Chăm sóc khách hàng",
    code: "CS",
    manager: "Trần Thị B",
    managerAvatar: "TTB",
    employeeCount: 8,
    targetAmount: 5000000000,
    currentAmount: 4200000000,
    progress: 84,
  },
  {
    id: 3,
    name: "Marketing",
    code: "MKT",
    manager: "Lê Văn C",
    managerAvatar: "LVC",
    employeeCount: 5,
    targetAmount: 3000000000,
    currentAmount: 2100000000,
    progress: 70,
  },
  {
    id: 4,
    name: "Hành chính",
    code: "ADMIN",
    manager: "Phạm Thị D",
    managerAvatar: "PTD",
    employeeCount: 4,
    targetAmount: 1000000000,
    currentAmount: 950000000,
    progress: 95,
  },
]

export default function DepartmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Quản lý Phòng ban</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm phòng ban
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Danh sách</TabsTrigger>
          <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách phòng ban</CardTitle>
              <CardDescription>Quản lý thông tin các phòng ban tại chi nhánh</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên phòng ban</TableHead>
                    <TableHead>Mã</TableHead>
                    <TableHead>Trưởng phòng</TableHead>
                    <TableHead>Số nhân viên</TableHead>
                    <TableHead>Chỉ tiêu</TableHead>
                    <TableHead>Hiện tại</TableHead>
                    <TableHead>Tiến độ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">{department.name}</TableCell>
                      <TableCell>{department.code}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={`/placeholder.svg?height=24&width=24&text=${department.managerAvatar}`}
                              alt={department.manager}
                            />
                            <AvatarFallback>{department.managerAvatar}</AvatarFallback>
                          </Avatar>
                          {department.manager}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {department.employeeCount}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(department.targetAmount)}</TableCell>
                      <TableCell>{formatCurrency(department.currentAmount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${department.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{department.progress}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {departments.map((department) => (
            <Card key={department.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{department.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{department.employeeCount} nhân viên</span>
                  </div>
                </div>
                <CardDescription>Mã phòng ban: {department.code}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&text=${department.managerAvatar}`}
                          alt={department.manager}
                        />
                        <AvatarFallback>{department.managerAvatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{department.manager}</p>
                        <p className="text-xs text-muted-foreground">Trưởng phòng</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Chỉ tiêu</p>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{formatCurrency(department.targetAmount)}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Hiện tại</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{formatCurrency(department.currentAmount)}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tiến độ</p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${department.progress}%` }} />
                      </div>
                      <span className="text-sm font-medium">{department.progress}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất phòng ban</CardTitle>
              <CardDescription>So sánh hiệu suất giữa các phòng ban</CardDescription>
            </CardHeader>
            <CardContent>
              <DepartmentPerformanceChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddDepartmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
