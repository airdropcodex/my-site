import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import ProductForm from "../../components/ProductForm"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Edit Product</h1>
        <p className="text-neutral-600 mt-2">Update product information</p>
      </div>

      <ProductForm product={product} isEditing={true} />
    </div>
  )
}
