import ProductForm from "../components/ProductForm"

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Add New Product</h1>
        <p className="text-neutral-600 mt-2">Create a new product for your catalog</p>
      </div>

      <ProductForm />
    </div>
  )
}
