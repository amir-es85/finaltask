"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClinet"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // بررسی اولیه برای session
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace("/login")
      } else {
        setChecking(false)
      }
    }

    checkAuth()

    // 👇 اینجاست که logout فوراً شناسایی میشه
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.replace("/login") // بلافاصله بعد از signOut می‌فرسته به login
      }
      if (event === "SIGNED_IN") {
        setChecking(false)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-[#644FC1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
