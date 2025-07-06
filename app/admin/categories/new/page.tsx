import CategoryForm from "../components/CategoryForm"

export default function NewCategoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Add New Category</h1>
        <p className="text-neutral-600 mt-2">Create a new product category</p>
      </div>

      <CategoryForm />
    </div>
  )
}
