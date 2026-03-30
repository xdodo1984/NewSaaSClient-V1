'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createOrder(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const orderData = {
    user_id: user.id,
    title: formData.get('title') as string,
    content_type: formData.get('content_type') as string,
    word_count: formData.get('word_count') ? parseInt(formData.get('word_count') as string) : null,
    description: formData.get('description') as string || null,
    priority: formData.get('priority') as string || 'normal',
    due_date: formData.get('due_date') ? new Date(formData.get('due_date') as string).toISOString() : null,
  }

  const { error } = await supabase.from('orders').insert(orderData)

  if (error) {
    redirect('/orders/new?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/orders')
  revalidatePath('/dashboard')
  redirect('/orders')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const profileData = {
    full_name: formData.get('fullName') as string,
    company_name: formData.get('companyName') as string,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', user.id)

  if (error) {
    redirect('/settings?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/settings')
  redirect('/settings?message=' + encodeURIComponent('Profile updated successfully.'))
}

export async function updatePreferences(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const settingsData = {
    preferred_tone: formData.get('tone') as string,
    preferred_language: formData.get('language') as string,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('settings')
    .update(settingsData)
    .eq('user_id', user.id)

  if (error) {
    redirect('/settings?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/settings')
  redirect('/settings?message=' + encodeURIComponent('Preferences updated successfully.'))
}
