"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Target, TrendingUp, Eye, Pencil, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DepartmentPerformanceChart from "@/components/department-perfomance-chart"
import AddDepartmentModal from "@/components/add-department-modal"
import { getDepartments, createDepartment, updateDepartment, deleteDepartment, Department } from "@/services/department.service"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export default function DepartmentsPage() {
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      setIsLoading(true)
      const data = await getDepartments()
      setDepartments(data)
    } catch (error) {
      console.error('Error fetching departments:', error)
      toast.error("Failed to fetch departments")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateDepartment = async (formData: Omit<Department, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await createDepartment(formData)
      toast.success("Department created successfully")
      setIsModalOpen(false)
      fetchDepartments()
    } catch (error) {
      console.error('Error creating department:', error)
      toast.error("Failed to create department")
    }
  }

  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return

    try {
      await deleteDepartment(selectedDepartment.id)
      toast.success("Department deleted successfully")
      setIsDeleteDialogOpen(false)
      setSelectedDepartment(null)
      fetchDepartments()
    } catch (error) {
      console.error('Error deleting department:', error)
      toast.error("Failed to delete department")
    }
  }

  const handleViewDepartment = (department: Department) => {
    router.push(`/departments/${department.id}`)
  }

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
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : departments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        No departments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    departments.map((department) => (
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
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleViewDepartment(department)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => {
                                setSelectedDepartment(department)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {!isLoading && departments.map((department) => (
            <Card key={department.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{department.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{department.employeeCount} nhân viên</span>
                  </div>
                </div>
                <CardDescription>Mã phòng ban: {department.id}</CardDescription>
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
              <DepartmentPerformanceChart departments={departments} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddDepartmentModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        onSubmit={handleCreateDepartment}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa phòng ban</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa phòng ban {selectedDepartment?.name}? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDepartment}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
