import { createClient } from '@/lib/supabase/server'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { updateProfile, updatePreferences } from "../actions"
import type { Profile, Settings } from '@/types/database'

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  let profile: Profile | null = null
  let settings: Settings | null = null

  if (user) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = profileData as Profile | null

    const { data: settingsData } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .single()
    settings = settingsData as Settings | null
  }

  return (
    <div className="max-w-4xl flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Update your personal and company information.</CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                <img
                  src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <Button type="button" variant="outline">Change Avatar</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" defaultValue={profile?.full_name || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" defaultValue={profile?.company_name || ''} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-gray-50/50 rounded-b-xl">
            <Button formAction={updateProfile}>Save Profile</Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Configure your default writing preferences and settings.</CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tone">Default Writing Tone</Label>
                <select
                  id="tone"
                  name="tone"
                  defaultValue={settings?.preferred_tone || 'professional'}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="enthusiastic">Enthusiastic</option>
                  <option value="informative">Informative</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <select
                  id="language"
                  name="language"
                  defaultValue={settings?.preferred_language || 'en'}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  <option value="en">English (US)</option>
                  <option value="en-gb">English (UK)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 bg-gray-50/50 rounded-b-xl">
            <Button formAction={updatePreferences}>Save Preferences</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
