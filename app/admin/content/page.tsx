import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react"
import Link from "next/link"

export default async function ContentPage() {
  const supabase = createServerClient()

  const { data: pages } = await supabase.from("content_pages").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Content Pages</h1>
          <p className="text-neutral-600 mt-2">Manage website content and pages</p>
        </div>
        <Link href="/admin/content/new">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Page
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pages?.map((page) => (
              <div
                key={page.id}
                className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{page.title}</h3>
                  <p className="text-sm text-neutral-600">/{page.slug}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={page.is_published ? "default" : "secondary"}>
                      {page.is_published ? "Published" : "Draft"}
                    </Badge>
                    {page.published_at && (
                      <span className="text-xs text-neutral-500">
                        Published {new Date(page.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Link href={`/admin/content/${page.id}/edit`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
