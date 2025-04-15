"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddCustomerModal from "@/components/add-customer-modal"

type CustomerStatus = "new" | "consulting" | "closed" | "failed"

type Customer = {
  id: number
  name: string
  phone: string
  source: string
  status: CustomerStatus
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Nguyễn Văn Khách",
    phone: "0912345678",
    source: "Website",
    status: "new",
  },
  {
    id: 2,
    name: "Trần Thị Hàng",
    phone: "0923456789",
    source: "Facebook",
    status: "consulting",
  },
  {
    id: 3,
    name: "Lê Văn Mua",
    phone: "0934567890",
    source: "Giới thiệu",
    status: "closed",
  },
  {
    id: 4,
    name: "Phạm Thị Quan Tâm",
    phone: "0945678901",
    source: "Triển lãm",
    status: "consulting",
  },
  {
    id: 5,
    name: "Hoàng Văn Hỏi",
    phone: "0956789012",
    source: "Website",
    status: "failed",
  },
  {
    id: 6,
    name: "Đỗ Thị Tìm",
    phone: "0967890123",
    source: "Instagram",
    status: "new",
  },
]

const statusLabels: Record<CustomerStatus, string> = {
  new: "Mới",
  consulting: "Đang tư vấn",
  closed: "Chốt đơn",
  failed: "Thất bại",
}

const statusVariants: Record<CustomerStatus, "default" | "secondary" | "success" | "destructive"> = {
  new: "secondary",
  consulting: "default",
  closed: "success",
  failed: "destructive",
}

export default function CustomersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredCustomers =
    statusFilter === "all" ? customers : customers.filter((customer) => customer.status === statusFilter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Quản lý Khách hàng</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm khách hàng
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
          <CardDescription>Quản lý thông tin khách hàng tiềm năng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Lọc theo trạng thái:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="new">Mới</SelectItem>
                  <SelectItem value="consulting">Đang tư vấn</SelectItem>
                  <SelectItem value="closed">Chốt đơn</SelectItem>
                  <SelectItem value="failed">Thất bại</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Nguồn tiếp cận</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.source}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[customer.status]}>{statusLabels[customer.status]}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddCustomerModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
