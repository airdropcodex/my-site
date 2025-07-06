"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface CategoryFormProps {
  category?: any
  isEditing?: boolean
}

export default function CategoryForm({ category, isEditing = false }: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    icon: category?.icon || "",
    color: category?.color || "from-indigo-500 to-purple-500",
    is_active: category?.is_active ?? true,
  })

  const router = useRouter()
  const supabase = createClient()

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing && category) {
        const { error } = await supabase.from("categories").update(formData).eq("id", category.id)
        if (error) throw error
        toast.success("Category updated successfully!")
      } else {
        const { error } = await supabase.from("categories").insert([formData])
        if (error) throw error
        toast.success("Category created successfully!")
      }

      router.push("/admin/categories")
    } catch (error: any) {
      toast.error(error.message || "Failed to save category")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="category-url-slug"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter category description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                placeholder="e.g., Snowflake, Package, Tv"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color Gradient</Label>
              <select
                id="color"
                value={formData.color}
                onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="from-cyan-500 to-blue-500">Blue</option>
                <option value="from-emerald-500 to-teal-500">Green</option>
                <option value="from-violet-500 to-purple-500">Purple</option>
                <option value="from-orange-500 to-red-500">Orange</option>
                <option value="from-indigo-500 to-blue-500">Indigo</option>
                <option value="from-pink-500 to-rose-500">Pink</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="active">Active Category</Label>
            <Switch
              id="active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-neutral-200">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          {isLoading ? "Saving..." : isEditing ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  )
}
