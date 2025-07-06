import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductViewPageProps {
  params: {
    id: string
  }
}

export default async function ProductViewPage({ params }: ProductViewPageProps) {
  const supabase = createServerClient()

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("id", params.id)
    .single()

  if (error || !product) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">{product.name}</h1>
            <p className="text-neutral-600 mt-2">Product Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/products/${product.id}/edit`}>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Product
            </Button>
          </Link>
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Image */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl overflow-hidden">
              <Image
                src={product.image_url || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Basic Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-neutral-600">Name:</span>
                      <p className="font-medium">{product.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-600">Category:</span>
                      <p className="font-medium">{product.categories?.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-600">SKU:</span>
                      <p className="font-medium">{product.slug}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Pricing & Stock</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-neutral-600">Price:</span>
                      <p className="font-medium text-2xl">{formatPrice(product.price)}</p>
                    </div>
                    {product.original_price && (
                      <div>
                        <span className="text-sm text-neutral-600">Original Price:</span>
                        <p className="font-medium line-through text-neutral-500">
                          {formatPrice(product.original_price)}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-neutral-600">Stock:</span>
                      <p className="font-medium">{product.stock_quantity} units</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Description</h3>
                <p className="text-neutral-600">{product.description}</p>
              </div>

              {product.features && (
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {product.rating} ({product.review_count} reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                  {product.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                  {product.badge && <Badge className="bg-red-100 text-red-800">{product.badge}</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
