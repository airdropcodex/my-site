import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldX, ArrowLeft } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto">
            <ShieldX className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900">Access Denied</CardTitle>
          <p className="text-neutral-600">You don't have permission to access the admin panel</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700">
              Admin privileges are required to access this area. Please contact your administrator if you believe this
              is an error.
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button variant="outline" className="w-full bg-transparent">
                Sign In with Different Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
