import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, ImageIcon } from "lucide-react"

export default function MediaPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Media Library</h1>
          <p className="text-neutral-600 mt-2">Manage images, videos, and files</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Media Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Placeholder media items */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center group hover:shadow-lg transition-all duration-300"
              >
                <ImageIcon className="h-8 w-8 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
