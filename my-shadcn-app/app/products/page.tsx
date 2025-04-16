"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AddProductModal from "@/components/add-product-modal"
import EditProductModal from "@/components/edit-product-modal"
import DeleteProductDialog from "@/components/delete-product-dialog"
import ProductCard from "@/components/product-card"

export type Product = {
  id: number
  model_name: string
  listed_price: number
  selling_price: number
  colors: string[]
  image: string
  category: string
  year: number
}

const initialProducts: Product[] = [
  {
    id: 1,
    model_name: "VF 8 Eco",
    listed_price: 1260000000,
    selling_price: 1180000000,
    colors: ["Đen", "Trắng", "Xanh", "Xám"],
    image: "/placeholder.svg?height=200&width=300&text=VF8",
    category: "SUV",
    year: 2023,
  },
  {
    id: 2,
    model_name: "VF 8 Plus",
    listed_price: 1470000000,
    selling_price: 1380000000,
    colors: ["Đen", "Trắng", "Xanh", "Xám", "Đỏ"],
    image: "/placeholder.svg?height=200&width=300&text=VF8+",
    category: "SUV",
    year: 2023,
  },
  {
    id: 3,
    model_name: "VF 9 Eco",
    listed_price: 1890000000,
    selling_price: 1790000000,
    colors: ["Đen", "Trắng", "Xanh", "Xám"],
    image: "/placeholder.svg?height=200&width=300&text=VF9",
    category: "SUV",
    year: 2023,
  },
  {
    id: 4,
    model_name: "VF 9 Plus",
    listed_price: 2090000000,
    selling_price: 1980000000,
    colors: ["Đen", "Trắng", "Xanh", "Xám", "Đỏ"],
    image: "/placeholder.svg?height=200&width=300&text=VF9+",
    category: "SUV",
    year: 2023,
  },
  {
    id: 5,
    model_name: "VF 5 Plus",
    listed_price: 458000000,
    selling_price: 438000000,
    colors: ["Đen", "Trắng", "Xanh", "Xám", "Đỏ"],
    image: "/placeholder.svg?height=200&width=300&text=VF5+",
    category: "SUV",
    year: 2023,
  },
  {
    id: 6,
    model_name: "VF 6 Eco",
    listed_price: 675000000,
    selling_price: 645000000,
    colors: ["Đen", "Trắng", "Xanh", "Xám"],
    image: "/placeholder.svg?height=200&width=300&text=VF6",
    category: "SUV",
    year: 2023,
  },
  {
    id: 7,
    model_name: "VF 6 Plus",
    listed_price: 765000000,
    selling_price: 735000000,
    colors: ["Đen", "Trắng", "Xanh", "Xám", "Đỏ"],
    image: "/placeholder.svg?height=200&width=300&text=VF6+",
    category: "SUV",
    year: 2023,
  },
  {
    id: 8,
    model_name: "VF 7 Eco",
    listed_price: 850000000,
    selling_price: 820000000,
    colors: ["Đen", "Trắng", "Xanh", "Xám"],
    image: "/placeholder.svg?height=200&width=300&text=VF7",
    category: "SUV",
    year: 2023,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  const filteredProducts = products.filter((product) =>
    product.model_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = (newProduct: Omit<Product, "id" | "image">) => {
    const id = Math.max(0, ...products.map((p) => p.id)) + 1
    const image = `/placeholder.svg?height=200&width=300&text=${newProduct.model_name.replace(/\s+/g, "")}`

    setProducts([...products, { ...newProduct, id, image }])
  }

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    setIsEditModalOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id))
      setIsDeleteDialogOpen(false)
      setSelectedProduct(null)
    }
  }

  const openEditModal = (product: Product) => {
    setSelectedProduct(product)
    setIsEditModalOpen(true)
  }

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Quản lý Sản phẩm</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Tìm kiếm</span>
        </Button>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Lưới</TabsTrigger>
          <TabsTrigger value="table">Bảng</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                formatCurrency={formatCurrency}
                onEdit={() => openEditModal(product)}
                onDelete={() => openDeleteDialog(product)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách sản phẩm</CardTitle>
              <CardDescription>Quản lý thông tin các mẫu xe VinFast</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mẫu xe</TableHead>
                    <TableHead>Giá niêm yết</TableHead>
                    <TableHead>Giá bán</TableHead>
                    <TableHead>Màu sắc</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Năm</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.model_name}</TableCell>
                      <TableCell>{formatCurrency(product.listed_price)}</TableCell>
                      <TableCell>{formatCurrency(product.selling_price)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {product.colors.map((color) => (
                            <Badge key={color} variant="outline">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.year}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditModal(product)}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Sửa</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(product)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Xóa</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddProductModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAddProduct={handleAddProduct} />

      {selectedProduct && (
        <EditProductModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          product={selectedProduct}
          onEditProduct={handleEditProduct}
        />
      )}

      {selectedProduct && (
        <DeleteProductDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          product={selectedProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  )
}
