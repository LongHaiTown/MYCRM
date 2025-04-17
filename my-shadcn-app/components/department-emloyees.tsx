"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Mail, Phone, Plus } from "lucide-react"

type Employee = {
  id: number
  name: string
  avatar: string
  email: string
  phone: string
  position: string
  joinDate: string
  status: "active" | "inactive" | "onleave"
}

// Dữ liệu mẫu cho nhân viên theo phòng ban
const departmentEmployees: Record<number, Employee[]> = {
  1: [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "NVA",
      email: "nguyenvana@vinfast.vn",
      phone: "0912345678",
      position: "Trưởng phòng",
      joinDate: "01/01/2022",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "TTB",
      email: "tranthib@vinfast.vn",
      phone: "0923456789",
      position: "Nhân viên kinh doanh cao cấp",
      joinDate: "15/02/2022",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "LVC",
      email: "levanc@vinfast.vn",
      phone: "0934567890",
      position: "Nhân viên kinh doanh",
      joinDate: "01/03/2022",
      status: "active",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      avatar: "PTD",
      email: "phamthid@vinfast.vn",
      phone: "0945678901",
      position: "Nhân viên kinh doanh",
      joinDate: "01/04/2022",
      status: "onleave",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      avatar: "HVE",
      email: "hoangvane@vinfast.vn",
      phone: "0956789012",
      position: "Nhân viên kinh doanh",
      joinDate: "01/05/2022",
      status: "active",
    },
  ],
  2: [
    {
      id: 6,
      name: "Trần Thị B",
      avatar: "TTB",
      email: "tranthib@vinfast.vn",
      phone: "0923456789",
      position: "Trưởng phòng",
      joinDate: "15/02/2022",
      status: "active",
    },
    {
      id: 7,
      name: "Đỗ Thị F",
      avatar: "DTF",
      email: "dothif@vinfast.vn",
      phone: "0967890123",
      position: "Nhân viên CSKH cao cấp",
      joinDate: "01/06/2022",
      status: "active",
    },
    {
      id: 8,
      name: "Vũ Văn G",
      avatar: "VVG",
      email: "vuvang@vinfast.vn",
      phone: "0978901234",
      position: "Nhân viên CSKH",
      joinDate: "01/07/2022",
      status: "inactive",
    },
  ],
  3: [
    {
      id: 9,
      name: "Lê Văn C",
      avatar: "LVC",
      email: "levanc@vinfast.vn",
      phone: "0934567890",
      position: "Trưởng phòng",
      joinDate: "01/03/2022",
      status: "active",
    },
    {
      id: 10,
      name: "Ngô Thị H",
      avatar: "NTH",
      email: "ngothih@vinfast.vn",
      phone: "0989012345",
      position: "Nhân viên Marketing",
      joinDate: "01/08/2022",
      status: "active",
    },
  ],
  4: [
    {
      id: 11,
      name: "Phạm Thị D",
      avatar: "PTD",
      email: "phamthid@vinfast.vn",
      phone: "0945678901",
      position: "Trưởng phòng",
      joinDate: "01/04/2022",
      status: "active",
    },
    {
      id: 12,
      name: "Lý Văn I",
      avatar: "LVI",
      email: "lyvani@vinfast.vn",
      phone: "0990123456",
      position: "Nhân viên Hành chính",
      joinDate: "01/09/2022",
      status: "active",
    },
  ],
}

const statusLabels: Record<string, string> = {
  active: "Đang làm việc",
  inactive: "Nghỉ việc",
  onleave: "Nghỉ phép",
}

const statusVariants: Record<string, "default" | "secondary" | "destructive"> = {
  active: "default",
  inactive: "destructive",
  onleave: "secondary",
}

type DepartmentEmployeesProps = {
  departmentId: number
}

export default function DepartmentEmployees({ departmentId }: DepartmentEmployeesProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const employees = departmentEmployees[departmentId] || []
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Danh sách nhân viên</CardTitle>
          <CardDescription>Quản lý nhân viên trong phòng ban</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm nhân viên
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
          <Input
            type="search"
            placeholder="Tìm kiếm nhân viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Tìm kiếm</span>
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Chức vụ</TableHead>
              <TableHead>Liên hệ</TableHead>
              <TableHead>Ngày vào làm</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`/placeholder.svg?height=36&width=36&text=${employee.avatar}`}
                        alt={employee.name}
                      />
                      <AvatarFallback>{employee.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{employee.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.joinDate}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[employee.status]}>{statusLabels[employee.status]}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
