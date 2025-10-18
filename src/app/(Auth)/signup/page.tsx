'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { supabase } from '@/lib/supabaseClinet'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import  Link from 'next/link';

interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const signupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export default function Signup() {
  const router = useRouter()
  
  const { register, handleSubmit, reset, formState: { isSubmitting, isValid } } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    mode: "onChange"
  })

  const onSubmit = async (data: SignupFormData) => {
    try {

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { emailRedirectTo: "https://fundforfoundamir.netlify.app/login" }
      })

      if (authError || !authData.user) {
        toast.error(`Auth error: ${authError?.message || "User already exists"}`)
        return
      }

   
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('userid')
        .eq('userid', authData.user.id)
        .single()

      if (existingProfile) {
        toast.info("Profile already exists. You can login.")
        return
      }

  
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          userid: authData.user.id,
          fristname: data.firstName,
          lastname: data.lastName
      }])

      if (profileError) {
        toast.error(`Profile error: ${profileError.message}`)
        return
      }

    
      toast.success("Signup successful! Please check your email to verify your account.")
      reset()
      setTimeout(() => {
        router.push('/login')
      }, 5000)

    } catch (err) {
      toast.error('Unexpected error occurred. Please try again.')
      console.error(err)
    }
  }
  
  

  return (
    <div className="flex flex-col items-center mt-8 md:mt-0  md:justify-center">
 
      <div className="flex flex-col items-center justify-center gap-6 md:gap-5 md:mb-6">
        <h3 className="text-[#555555] font-normal text-base md:text-2xl md:font-medium md:text-[#3B3B3B]">
          Create your personal account
        </h3>
        <h2 className="text-[#644FC1] text-lg font-semibold md:text-4xl md:font-bold md:text-[#5A43C3]">
          FUND FOR FOUND
        </h2>
        <img className="w-14 h-24 md:w-20 md:h-28" src="/Vector.png" alt="fund" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-5 w-[90%] md:w-[360px] md:mt-0"
      >
        <label className="text-[#2D2D2D] font-light text-sm">Firstname</label>
        <input
          {...register('firstName')}
          className="border border-[#644FC1] rounded border-2 mb-3 p-1"
        />

        <label className="text-[#2D2D2D] font-light text-sm">Lastname</label>
        <input
          {...register('lastName')}
          className="border border-[#644FC1] rounded border-2 mb-3 p-1"
        />

        <label className="text-[#2D2D2D] font-light text-sm">Email address</label>
        <input
          {...register('email')}
          type="email"
          className="border border-[#644FC1] rounded border-2 mb-3 p-1"
        />

        <label className="text-[#2D2D2D] font-light text-sm">Password</label>
        <input
          {...register('password')}
          type="password"
          className="border border-[#644FC1] rounded border-2 mb-5 p-1"
        />

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="bg-[#644FC1] rounded text-white pt-2 pb-2 font-light text-sm hover:bg-[#5b46b5] md:pt-2 md:pb-2 md:text-base transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Continue'}
        </button>
        <p className='text-center mt-2'><Link href='/login' className="text-[#644FC1] text-sm font-medium ">Back to login</Link></p>
      </form>

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
