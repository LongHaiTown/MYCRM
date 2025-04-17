"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, Employee } from "@/services/employee.service"
import { toast } from "sonner"
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import AddEmployeeModal from "@/components/add-employee-modal"
import EditEmployeeModal from "@/components/edit-employee-modal"
import DeleteEmployeeDialog from "@/components/delete-employee-dialog"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setIsLoading(true)
      const data = await getEmployees()
      console.log('Employees API Response:', data)

      const formattedData = data.map((employee: any) => ({
        ...employee,
        created_at: employee.createdAt,
        updated_at: employee.updatedAt,
      }))
  
      setEmployees(formattedData)
    } catch (error) {
      console.error('Error fetching employees:', error)
      toast.error("Failed to fetch employees")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateEmployee = async (formData: any) => {
    try {
      await createEmployee({
        ...formData,
        department_id: parseInt(formData.department)
      })
      toast.success("Employee created successfully")
      setIsAddModalOpen(false)
      fetchEmployees()
    } catch (error) {
      console.error('Error creating employee:', error)
      toast.error("Failed to create employee")
    }
  }

  const handleEditClick = async (employee: Employee) => {
    try {
      setIsLoadingEmployee(true)
      const employeeDetails = await getEmployeeById(employee.id)
      console.log('Employee Details API Response:', employeeDetails)
      
      const formattedEmployee = {
        ...employeeDetails.data,
        created_at: employeeDetails.data.createdAt,
        updated_at: employeeDetails.data.updatedAt,
      }
      
      setSelectedEmployee(formattedEmployee)
      setIsEditModalOpen(true)
    } catch (error) {
      console.error('Error fetching employee details:', error)
      toast.error("Failed to fetch employee details")
    } finally {
      setIsLoadingEmployee(false)
    }
  }

  const handleUpdateEmployee = async (formData: any) => {
    if (!selectedEmployee) return

    try {
      await updateEmployee(selectedEmployee.id, {
        ...formData,
        department_id: parseInt(formData.department)
      })
      toast.success("Employee updated successfully")
      setIsEditModalOpen(false)
      setSelectedEmployee(null)
      fetchEmployees()
    } catch (error) {
      console.error('Error updating employee:', error)
      toast.error("Failed to update employee")
    }
  }

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee) return

    try {
      await deleteEmployee(selectedEmployee.id)
      toast.success("Employee deleted successfully")
      setIsDeleteDialogOpen(false)
      setSelectedEmployee(null)
      fetchEmployees()
    } catch (error) {
      console.error('Error deleting employee:', error)
      toast.error("Failed to delete employee")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Quản lý Nhân viên</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      <AddEmployeeModal 
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleCreateEmployee}
      />

      <EditEmployeeModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleUpdateEmployee}
        employee={selectedEmployee}
        isLoading={isLoadingEmployee}
      />

      <DeleteEmployeeDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteEmployee}
        employeeName={selectedEmployee?.name || ''}
      />

      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhân viên</CardTitle>
          <CardDescription>Quản lý thông tin nhân viên tại chi nhánh</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày cập nhật</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No employees found
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.phone || '-'}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.department_id}</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      {employee.created_at ? format(new Date(employee.created_at), 'dd/MM/yyyy HH:mm:ss', { locale: vi }) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {employee.updated_at ? format(new Date(employee.updated_at), 'dd/MM/yyyy HH:mm:ss', { locale: vi }) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClick(employee)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          Delete
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
    </div>
  )
}
