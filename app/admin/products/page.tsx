import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Link from "next/link"
import ProductActions from "./components/ProductActions"

export default async function ProductsPage() {
  const supabase = createServerClient()

  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Products</h1>
          <p className="text-neutral-600 mt-2">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products?.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-xl flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-neutral-500 text-xs">No Image</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                  <p className="text-sm text-neutral-600">{product.categories?.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {product.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                    {product.badge && <Badge className="bg-red-100 text-red-800">{product.badge}</Badge>}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-neutral-900">${product.price}</p>
                  {product.original_price && (
                    <p className="text-sm text-neutral-500 line-through">${product.original_price}</p>
                  )}
                  <p className="text-xs text-neutral-600">Stock: {product.stock_quantity}</p>
                </div>

                <ProductActions productId={product.id} productName={product.name} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
