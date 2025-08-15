import type React from "react"
export interface User {
  id: string
  name: string
  email: string
  studentId: string
  avatar?: string
}

export interface Comment {
  id: string
  content: string
  author: User
  createdAt: Date
  likes: number
  isAnonymous?: boolean
  parentId?: string // For replies to comments
  replies?: Comment[] // Nested replies
}

export interface Post {
  id: string
  title: string
  content: string
  author: User
  createdAt: Date
  updatedAt: Date
  category: string
  likes: number
  comments: Comment[]
  isAnonymous?: boolean
  tags?: string[]
  views?: number
  images?: string[]
  deliveryInfo?: {
    targetAmount: number
    currentAmount: number
    deliveryFee: number
    location: string
    deadline: string
    status: string
    participants: string[]
  }
}

export interface PostList {
  id: string
  title: string
  content: string
  author: User
  createdAt: Date
  updatedAt: Date
  category: string
  likes: number
  isAnonymous?: boolean
  tags?: string[]
  views?: number
  images?: string
  commentNumber?: number
}

export interface Notice {
  id: string
  title: string
  content: string
  author: User
  createdAt: Date
  isPinned: boolean
  category: string
  views: number
}

export interface DeliveryOrder {
  id: string
  restaurant: string
  targetAmount: number
  currentAmount: number
  deadline: Date
  organizer: User
  participants: User[]
  status: "recruiting" | "ordering" | "completed" | "cancelled"
  deliveryFee: number
  location: string
  createdAt: Date
}

export interface NavLink {
  path: string
  label: string
  icon: React.ElementType
}

export interface FeatureItem {
  icon: React.ElementType
  title: string
  description: string
}

export interface StatItem {
  value: string
  label: string
}
