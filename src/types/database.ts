export interface Profile {
  id: string
  full_name: string | null
  company_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  title: string
  description: string | null
  content_type: string
  word_count: number | null
  status: 'pending' | 'in_progress' | 'review' | 'revision' | 'completed' | 'cancelled'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  due_date: string | null
  delivered_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Settings {
  id: string
  user_id: string
  preferred_tone: string
  preferred_language: string
  email_notifications: boolean
  auto_approve: boolean
  created_at: string
  updated_at: string
}

export type OrderStatus = Order['status']
export type OrderPriority = Order['priority']
export type ContentType = 'blog_post' | 'social_media' | 'website_copy' | 'email' | 'other'
