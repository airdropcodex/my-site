import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Save } from "lucide-react"

export default async function SettingsPage() {
  const supabase = createServerClient()

  const { data: settings } = await supabase.from("settings").select("*").order("key")

  const settingsMap = settings?.reduce(
    (acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    },
    {} as Record<string, any>,
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-2">Configure your store settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="site_name">Site Name</Label>
              <Input
                id="site_name"
                defaultValue={settingsMap?.site_name?.replace(/"/g, "") || ""}
                placeholder="ElectroStore"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea
                id="site_description"
                defaultValue={settingsMap?.site_description?.replace(/"/g, "") || ""}
                placeholder="Premium Electronics for Modern Living"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                defaultValue={settingsMap?.contact_email?.replace(/"/g, "") || ""}
                placeholder="support@electrostore.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                defaultValue={settingsMap?.contact_phone?.replace(/"/g, "") || ""}
                placeholder="+880 1XXXXXXXXX"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment & Shipping */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Payment & Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue={settingsMap?.currency?.replace(/"/g, "") || "৳"} placeholder="৳" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipping_fee">Shipping Fee (৳)</Label>
              <Input id="shipping_fee" type="number" defaultValue={settingsMap?.shipping_fee || ""} placeholder="100" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="free_shipping_threshold">Free Shipping Threshold (৳)</Label>
              <Input
                id="free_shipping_threshold"
                type="number"
                defaultValue={settingsMap?.free_shipping_threshold || ""}
                placeholder="2000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bkash_merchant">bKash Merchant Number</Label>
              <Input
                id="bkash_merchant"
                defaultValue={settingsMap?.bkash_merchant?.replace(/"/g, "") || ""}
                placeholder="01XXXXXXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nagad_merchant">Nagad Merchant Number</Label>
              <Input
                id="nagad_merchant"
                defaultValue={settingsMap?.nagad_merchant?.replace(/"/g, "") || ""}
                placeholder="01XXXXXXXXX"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
