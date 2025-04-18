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
import { Product } from "@/services/product.service"
import { uploadService } from "@/services/upload.service"
import { useState } from "react"
import { toast } from "sonner"
import { ImagePlus, X } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên sản phẩm phải có ít nhất 2 ký tự",
  }),
  listedPrice: z.string().min(1, {
    message: "Vui lòng nhập giá niêm yết",
  }),
  salePrice: z.string().min(1, {
    message: "Vui lòng nhập giá bán",
  }),
  colors: z.array(z.string()).min(1, {
    message: "Vui lòng chọn ít nhất một màu sắc",
  }),
  type: z.enum(['electric-sedan', 'electric-SUV', 'bike', 'truck'], {
    required_error: "Vui lòng chọn loại sản phẩm",
  }),
  status: z.enum(['available', 'discontinued'], {
    required_error: "Vui lòng chọn trạng thái",
  }),
  year: z.string({
    required_error: "Vui lòng chọn năm sản xuất",
  }),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
})

type AddProductModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddProduct: (product: Omit<Product, "id">) => void
}

const colorOptions = [
  { id: "den", label: "Đen" },
  { id: "trang", label: "Trắng" },
  { id: "xanh", label: "Xanh" },
  { id: "xam", label: "Xám" },
  { id: "do", label: "Đỏ" },
]

export default function AddProductModal({ open, onOpenChange, onAddProduct }: AddProductModalProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      listedPrice: "",
      salePrice: "",
      colors: [],
      status: "available",
      description: "",
      images: [],
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 5) {
      toast.error("Bạn chỉ có thể tải lên tối đa 5 ảnh")
      return
    }

    setSelectedFiles(files)
    const previews = files.map(file => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  const removeImage = (index: number) => {
    const newFiles = [...selectedFiles]
    const newPreviews = [...previewImages]
    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)
    setSelectedFiles(newFiles)
    setPreviewImages(newPreviews)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsUploading(true)
      let imagePaths: string[] = []

      if (selectedFiles.length > 0) {
        imagePaths = await uploadService.uploadImages(selectedFiles)
      }

      const newProduct = {
        name: values.name,
        listedPrice: Number.parseFloat(values.listedPrice),
        salePrice: Number.parseFloat(values.salePrice),
        colors: values.colors,
        type: values.type,
        status: values.status,
        year: Number.parseInt(values.year),
        description: values.description,
        images: imagePaths,
      }

      onAddProduct(newProduct)
      onOpenChange(false)
      form.reset()
      setSelectedFiles([])
      setPreviewImages([])
    } catch (error) {
      toast.error("Lỗi khi tải lên ảnh")
      console.error("Error uploading images:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm mới</DialogTitle>
          <DialogDescription>Nhập thông tin sản phẩm mới vào form bên dưới</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="VF 8 Eco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="listedPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá niêm yết (VNĐ)</FormLabel>
                    <FormControl>
                      <Input placeholder="1260000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá bán (VNĐ)</FormLabel>
                    <FormControl>
                      <Input placeholder="1180000000" {...field} />
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại sản phẩm</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electric-sedan">Sedan điện</SelectItem>
                        <SelectItem value="electric-SUV">SUV điện</SelectItem>
                        <SelectItem value="bike">Xe máy</SelectItem>
                        <SelectItem value="truck">Xe tải</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="available">Có sẵn</SelectItem>
                        <SelectItem value="discontinued">Ngừng sản xuất</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mô tả sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Hình ảnh sản phẩm</FormLabel>
              <div className="flex flex-wrap gap-2">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview image ${index + 1} for ${form.getValues("name") || "new product"}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {previewImages.length < 5 && (
                  <label className="w-20 h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-accent">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  </label>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Tối đa 5 ảnh. Kích thước tối đa mỗi ảnh: 5MB
              </p>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Đang tải lên..." : "Thêm sản phẩm"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
