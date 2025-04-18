"use client"

import { useState, useEffect } from "react"
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
import { productService, Product } from "@/services/product.service"
import { toast } from "sonner"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await productService.getAll()
      setProducts(data)
    } catch (error) {
      setError("Failed to fetch products")
      toast.error("Failed to fetch products")
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  const filteredProducts = products.filter((product) => {
    if (!product || !product.name) return false
    return product.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleAddProduct = async (newProduct: Omit<Product, "id">) => {
    try {
      const product = await productService.create(newProduct)
      setProducts([...products, product])
      toast.success("Product added successfully")
    } catch (error) {
      toast.error("Failed to add product")
      console.error("Error adding product:", error)
    }
  }

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      const product = await productService.update(updatedProduct.id, updatedProduct)
      setProducts(products.map((p) => (p.id === product.id ? product : p)))
      toast.success("Product updated successfully")
    } catch (error) {
      toast.error("Failed to update product")
      console.error("Error updating product:", error)
    } finally {
      setIsEditModalOpen(false)
      setSelectedProduct(null)
    }
  }

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return

    try {
      await productService.delete(selectedProduct.id)
      setProducts(products.filter((p) => p.id !== selectedProduct.id))
      toast.success("Product deleted successfully")
    } catch (error) {
      toast.error("Failed to delete product")
      console.error("Error deleting product:", error)
    } finally {
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

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={fetchProducts}>Retry</Button>
      </div>
    )
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
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Giá niêm yết</TableHead>
                    <TableHead>Giá bán</TableHead>
                    <TableHead>Màu sắc</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Năm</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{formatCurrency(product.listedPrice)}</TableCell>
                      <TableCell>{formatCurrency(product.salePrice)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {product.colors.map((color) => (
                            <Badge key={color} variant="outline">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'available' ? 'default' : 'destructive'}>
                          {product.status}
                        </Badge>
                      </TableCell>
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

      <AddProductModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
        onAddProduct={(product) => handleAddProduct(product as Omit<Product, "id">)} 
      />

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
