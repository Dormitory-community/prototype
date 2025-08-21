import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { setSessionCookies, clearSessionCookies, getSessionFromCookies } from "@/utils/cookieUtils";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithKakao: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AutProvider가 필요합니다");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                        children,
                                                                      }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 세션 확인 (쿠키에서 먼저 확인)
    const getSession = async () => {
      // 먼저 쿠키에서 세션 확인
      const cookieSession = getSessionFromCookies();

      if (cookieSession) {
        setSession(cookieSession);
        setUser(cookieSession?.user ?? null);
      }

      // Supabase에서 최신 세션 확인
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setSessionCookies(session);
        setSession(session);
        setUser(session?.user ?? null);
      } else if (!cookieSession) {
        // 세션이 없고 쿠키에도 없으면 정리
        clearSessionCookies();
        setSession(null);
        setUser(null);
      }

      setLoading(false);
    };

    getSession();

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setSessionCookies(session);
        setSession(session);
        setUser(session?.user ?? null);
      } else {
        clearSessionCookies();
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 이메일 로그인
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    sessionStorage.setItem("testMode", "false")
    sessionStorage.setItem("bypassLocationCheck", "false")
    return { data, error };
  };

  // 회원가입
  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    // const { data: existingProfile, error: profileError } = await supabase
    //     .from('auth.users')
    //     .select('email')
    //     .eq('email', email)
    //     .maybeSingle();
    //
    // if (profileError) {
    //   return { data: null, error: new Error('회원 가입중 오류가 발생했습니다. 다시 시도해주세요.') };
    // }
    //
    //   if (existingProfile) {
    //   return { data: null, error: new Error('이미 등록된 이메일입니다. (소셜 계정 여부 확인)') };
    // }
      return { data, error };
  };

  // 카카오 로그인
  const signInWithKakao = async (): Promise<void> => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Kakao login error:", error);
      throw error;
    }
  };


  // 로그아웃
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    clearSessionCookies();
    sessionStorage.setItem("testMode", "false")
    sessionStorage.setItem("bypassLocationCheck", "false");
    if (error) throw error;
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            session,
            loading,
            signIn,
            signUp,
            signOut,
            signInWithKakao,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};