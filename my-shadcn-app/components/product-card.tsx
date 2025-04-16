"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import type { Product } from "@/app/products/page"

type ProductCardProps = {
  product: Product
  formatCurrency: (amount: number) => string
  onEdit: () => void
  onDelete: () => void
}

export default function ProductCard({ product, formatCurrency, onEdit, onDelete }: ProductCardProps) {
  const discount = product.listed_price - product.selling_price
  const discountPercentage = Math.round((discount / product.listed_price) * 100)

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.model_name}
          width={300}
          height={200}
          className="h-48 w-full object-cover"
        />
        {/* {discount > 0 && (
          <Badge className="absolute right-2 top-2 bg-red-500 text-white hover:bg-red-600">
            Giảm {discountPercentage}%
          </Badge>
        )} */}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{product.model_name}</CardTitle>
          <Badge variant="outline">{product.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Giá niêm yết:</span>
            <span className={discount > 0 ? "text-sm line-through" : "text-sm font-medium"}>
              {formatCurrency(product.listed_price)}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Giá bán:</span>
              <span className="text-sm font-medium text-red-500">{formatCurrency(product.selling_price)}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-1 pt-2">
            {product.colors.map((color) => (
              <Badge key={color} variant="secondary" className="text-xs">
                {color}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">Năm: {product.year}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Sửa</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="sr-only">Xóa</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
