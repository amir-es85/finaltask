'use client'
import Link from "next/link"
import { toast, ToastContainer } from 'react-toastify'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { supabase } from "@/lib/supabaseClinet"
import { useRouter } from "next/navigation"

interface ilogin{
  email : string;
  password : string
}
const loginschima= yup.object().shape({
email : yup.string().email().required(),
password : yup.string().min(6).required()
})
function Login() {
  const router = useRouter()
  const [type , settype]=useState<boolean>(false)
  const {register,handleSubmit,reset,formState:{isSubmitting , isValid,errors}}=useForm<ilogin>(
    {mode:"onChange",
      resolver: yupResolver(loginschima)
    },
  )
  const onsubmit = async (data : ilogin)=>{
const {data:loginformdata , error:logineror }=await supabase.auth.signInWithPassword({
  email : data.email,
  password : data.password
})
if (logineror) {
      // --- ایمیل تایید نشده ---
      if (logineror.message.includes('confirm')) {
        toast.info('Please verify your email before logging in.')
      } else {
        // --- ایمیل یا رمز اشتباه / ثبت‌نام نشده ---
        toast.error('Incorrect email or password.')
      }
      return
    }

    toast.success('Login successful!')
setTimeout(()=>{ router.push("/")},5000)
  }
  
  
  return (
<div className="flex flex-col items-center mt-5 md:mt-0 md:h-screen md:justify-center">
    <div className="flex flex-col items-center justify-center gap-6 md:gap-5 md:mb-6">
        <h2 className="text-[#644FC1] text-lg font-bold md:text-4xl md:font-bold md:text-[#5A43C3]">
          FUND FOR FOUND
        </h2>
        <h3 className="text-[#444444] text-2xl md:text-2xl font-medium text-center">Create an accont or sign to start creating</h3>
        <img className="w-14 h-24 md:w-20 md:h-28" src="/Vector.png" alt="fund" />
    </div>
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col mt-5 w-[90%] md:w-[360px] md:mt-0">
         <label className="text-[#2D2D2D] font-light text-sm">Email</label>
         <input type="email" className="border border-[#644FC1] rounded border-2 mb-3 p-1" {...register("email")}
         />
         {errors.email && (
  <p className="text-red-500 text-sm">{errors.email.message}</p>
)}
          <label className="text-[#2D2D2D] font-light text-sm">Password</label>
        <input
        type={type ? "text" : "password"} {...register("password")}
          className="border border-[#644FC1] rounded border-2 mb-0.5 p-1"
        />
       
        <div className="flex justify-between"> {errors.password && (
  <p className="text-red-500 text-sm">{errors.password.message}</p>
)}<button type="button" onClick={()=>settype(!type)} className=" mb-6 flex justify-start text-[#323334] font-light text-sm cursor-pointer ">{type ? "hide" : "show"}</button>
        </div>
        
        <button  disabled={isSubmitting || !isValid} type="submit" className="bg-[#644FC1] rounded text-white pt-2 pb-2 font-light text-sm hover:bg-[#5b46b5] md:pt-2 md:pb-2 md:text-base transition-colors disabled:opacity-50">{isSubmitting ? 'Logging in...' : 'Login'}</button>
  
    </form>
    <p className="mt-4 text-[#323334] font-light text-sm">Dont have on?</p>
    <p><Link href="/signup" className="text-[#644FC1] text-sm font-medium">Create an account</Link></p>
    <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
</div>

  )
}

export default Login