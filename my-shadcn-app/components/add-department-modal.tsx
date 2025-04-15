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

type AddDepartmentModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddDepartmentModal({ open, onOpenChange }: AddDepartmentModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      targetAmount: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trưởng phòng" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Nguyễn Văn A</SelectItem>
                      <SelectItem value="2">Trần Thị B</SelectItem>
                      <SelectItem value="3">Lê Văn C</SelectItem>
                      <SelectItem value="4">Phạm Thị D</SelectItem>
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
