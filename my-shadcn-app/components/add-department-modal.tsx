"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Department } from "@/services/department.service"
import { getManagers } from "@/services/employee.service"
import { useEffect, useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phòng ban phải có ít nhất 2 ký tự",
  }),
  code: z.string().min(2, {
    message: "Mã phòng ban phải có ít nhất 2 ký tự",
  }),
  manager: z.string({
    required_error: "Vui lòng chọn trưởng phòng",
  }),
  targetAmount: z.string().min(1, {
    message: "Vui lòng nhập chỉ tiêu",
  }),
})

interface AddDepartmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (formData: Omit<Department, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
}

export default function AddDepartmentModal({ open, onOpenChange, onSubmit }: AddDepartmentModalProps) {
  const [managers, setManagers] = useState<{ id: number; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setIsLoading(true)
        const data = await getManagers()
        setManagers(data)
      } catch (error) {
        console.error('Error fetching managers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (open) {
      fetchManagers()
    }
  }, [open])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      targetAmount: "",
    },
  })

  function onSubmitForm(values: z.infer<typeof formSchema>) {
    const selectedManager = managers.find(m => m.id.toString() === values.manager)
    const departmentData: Omit<Department, 'id' | 'created_at' | 'updated_at'> = {
      name: values.name,
      code: values.code,
      manager: selectedManager?.name || "",
      managerAvatar: selectedManager?.name.substring(0, 3).toUpperCase() || "",
      employeeCount: 0,
      targetAmount: parseFloat(values.targetAmount),
      currentAmount: 0,
      progress: 0
    }
    
    onSubmit(departmentData)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm phòng ban mới</DialogTitle>
          <DialogDescription>Nhập thông tin phòng ban mới vào form bên dưới</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên phòng ban</FormLabel>
                  <FormControl>
                    <Input placeholder="Kinh doanh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã phòng ban</FormLabel>
                  <FormControl>
                    <Input placeholder="SALES" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trưởng phòng</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoading ? "Đang tải..." : "Chọn trưởng phòng"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {managers.map((manager) => (
                        <SelectItem key={manager.id} value={manager.id.toString()}>
                          {manager.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chỉ tiêu (VNĐ)</FormLabel>
                  <FormControl>
                    <Input placeholder="10000000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Thêm phòng ban</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
