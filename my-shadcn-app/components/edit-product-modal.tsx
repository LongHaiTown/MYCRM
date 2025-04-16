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
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect } from "react"
import type { Product } from "@/app/products/page"

const formSchema = z.object({
  model_name: z.string().min(2, {
    message: "Tên mẫu xe phải có ít nhất 2 ký tự",
  }),
  listed_price: z.string().min(1, {
    message: "Vui lòng nhập giá niêm yết",
  }),
  selling_price: z.string().min(1, {
    message: "Vui lòng nhập giá bán",
  }),
  colors: z.array(z.string()).min(1, {
    message: "Vui lòng chọn ít nhất một màu sắc",
  }),
  category: z.string({
    required_error: "Vui lòng chọn danh mục",
  }),
  year: z.string({
    required_error: "Vui lòng chọn năm sản xuất",
  }),
})

type EditProductModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
  onEditProduct: (product: Product) => void
}

const colorOptions = [
  { id: "den", label: "Đen" },
  { id: "trang", label: "Trắng" },
  { id: "xanh", label: "Xanh" },
  { id: "xam", label: "Xám" },
  { id: "do", label: "Đỏ" },
]

export default function EditProductModal({ open, onOpenChange, product, onEditProduct }: EditProductModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model_name: product.model_name,
      listed_price: product.listed_price.toString(),
      selling_price: product.selling_price.toString(),
      colors: product.colors,
      category: product.category,
      year: product.year.toString(),
    },
  })

  // Update form when product changes
  useEffect(() => {
    form.reset({
      model_name: product.model_name,
      listed_price: product.listed_price.toString(),
      selling_price: product.selling_price.toString(),
      colors: product.colors,
      category: product.category,
      year: product.year.toString(),
    })
  }, [product, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedProduct: Product = {
      ...product,
      model_name: values.model_name,
      listed_price: Number.parseFloat(values.listed_price),
      selling_price: Number.parseFloat(values.selling_price),
      colors: values.colors,
      category: values.category,
      year: Number.parseInt(values.year),
    }

    onEditProduct(updatedProduct)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          <DialogDescription>Cập nhật thông tin sản phẩm</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="model_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên mẫu xe</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="listed_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá niêm yết (VNĐ)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="selling_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá bán (VNĐ)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="colors"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Màu sắc</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {colorOptions.map((color) => (
                      <FormField
                        key={color.id}
                        control={form.control}
                        name="colors"
                        render={({ field }) => {
                          return (
                            <FormItem key={color.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(color.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, color.label])
                                      : field.onChange(field.value?.filter((value) => value !== color.label))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{color.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Năm sản xuất</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn năm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
