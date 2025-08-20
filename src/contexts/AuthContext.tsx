"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import { User, Session, AuthError } from "@supabase/supabase-js"
import { setSessionCookies, clearSessionCookies } from "@/utils/cookieUtils"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>
  signInWithKakao: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 초기 세션 가져오기
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession()

        if (initialSession) {
          setSession(initialSession)
          setUser(initialSession.user)
          setSessionCookies(initialSession)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          console.log('Auth state changed:', event, currentSession)

          if (currentSession) {
            setSession(currentSession)
            setUser(currentSession.user)
            setSessionCookies(currentSession)
          } else {
            setSession(null)
            setUser(null)
            clearSessionCookies()
          }

          setLoading(false)
        }
    )

    return () => subscription.unsubscribe()
  }, [])

  // 이메일 로그인
  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error && data.session) {
        setSession(data.session)
        setUser(data.session.user)
        setSessionCookies(data.session)
      }

      return { error }
    } catch (error) {
      console.error('Email sign in error:', error)
      return { error: error as AuthError }
    } finally {
      setLoading(false)
    }
  }

  // 이메일 회원가입
  const signUpWithEmail = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            display_name: name,
          }
        }
      })

      // 회원가입 후 자동 로그인되는 경우 처리
      if (!error && data.session) {
        setSession(data.session)
        setUser(data.session.user)
        setSessionCookies(data.session)
      }

      return { error }
    } catch (error) {
      console.error('Email sign up error:', error)
      return { error: error as AuthError }
    } finally {
      setLoading(false)
    }
  }

  // 카카오 로그인
  const signInWithKakao = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      })

      if (error) {
        setLoading(false)
      }

      return { error }
    } catch (error) {
      console.error('Kakao sign in error:', error)
      setLoading(false)
      return { error: error as AuthError }
    }
  }

  // 로그아웃
  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
      clearSessionCookies()
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
      <AuthContext.Provider
          value={{
            user,
            session,
            loading,
            signInWithEmail,
            signUpWithEmail,
            signInWithKakao,
            signOut,
          }}
      >
        {children}
      </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}