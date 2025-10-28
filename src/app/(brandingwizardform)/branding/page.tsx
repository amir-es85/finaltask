'use client'
import ProtectedRoute from "@/components/ProtectedRoute"
import Stepsonebranding from "@/components/Stepsonebranding";
import Stepstwobranding from "@/components/Stepstwobranding";
import Stepstreebranding from "@/components/Stepstreebranding";
import { supabase } from "@/lib/supabaseClinet";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion"; // اضافه شد

export type tagoption = { label?: string; value?: string }
export type brandingformsvalues = {
  brand_name: string
  country: string
  category?: string
  sub_category?: string
  tags?: tagoption[]
  discription: string
  platform: { label?: string; url?: string }[]
  ischeck: boolean
}

function Branding() {
  const [steps, setsteps] = useState<number>(1)
  const [brandids,setbrandid]=useState<string|null>(null)

  const methods = useForm<brandingformsvalues>({
    mode:"onChange",
    defaultValues: {
      brand_name: "",
      country: "",
      category: "",
      sub_category: "",
      tags: [],
      discription: "",
      platform: [
        { label: "", url: "" },
        { label: "", url: "" },
        { label: "", url: "" },
      ],
      ischeck: false
    },
  })

  const nextstep = () => setsteps((prev) => prev + 1)
  const prevstep = () => setsteps((prev) => prev - 1)

  const onsubmit = async (formdata: brandingformsvalues) => {
    const tagsarr = (formdata.tags || []).map(t => t.value?.trim()).filter(Boolean)
    const uniquetags = Array.from(new Set(tagsarr))
    const tagsstring = uniquetags.join(',')
    const { data: authdata, error: autheror } = await supabase.auth.getUser()
    const userid = authdata?.user?.id

    if (autheror) {
      toast.error(autheror.message);
      return;
    }

    const { error: branderor, data: branddata } = await supabase.from("branding").insert([{
      userid: userid,
      name: formdata.brand_name,
      category: formdata.category,
      subcategory: formdata.sub_category,
      tags: tagsstring,
      description: formdata.discription,
      countries: formdata.country
    }]).select()

    if (branderor) {
      toast.error(branderor.message);
      return;
    }

    const brandid = branddata?.[0].id;
    setbrandid(brandid)
    const platforminsert = formdata.platform.filter(p => p.label?.trim() && p.url?.trim()).map(p => ({
      brand_id: brandid,
      label: p.label,
      link: p.url
    }))

    const { error: platformeror } = await supabase.from("branding-platform").insert(platforminsert)
    if (platformeror) {
      toast.error(platformeror.message);
      return;
    }

    toast.success("Your brand was created successfully")
    setsteps(steps + 1)
    methods.reset()
  }

  const totalSteps = 3;
  const stepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <ProtectedRoute>
      <FormProvider {...methods}>
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            {/* دکمه مرحله قبلی با فلش */}
            <button
              type="button"
              onClick={prevstep}
              disabled={steps === 1||steps === 3}
              className={`w-8 h-8 flex items-center justify-center rounded-full
                ${steps === 1 || steps === 3
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#644FC1] text-white hover:bg-[#553BB0]"}` }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {stepsArray.map((num, i) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                    ${steps === num ? "bg-[#644FC1] text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {num}
                </div>
                {i < stepsArray.length - 1 && (
                  <div className={`w-10 h-[2px] ${steps > num ? "bg-[#644FC1]" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Motion wrapper اضافه شد */}
          <motion.div
  key={steps}
  initial={{ opacity: 0, x: -1000, scale: 0.95 }}  // خیلی سمت چپ شروع می‌کنه
  animate={{ opacity: 1, x: 0, scale: 1 }}        // وسط صفحه
  exit={{ opacity: 0, x: 1000, scale: 0.95 }}     // خیلی سمت راست میره
  transition={{
    duration: 0.8,               // کمی طولانی‌تر برای حس smooth
    ease: [0.6, -0.05, 0.01, 0.99] // easing نرم و طبیعی
  }}
  className="w-full shadow-lg rounded-xl"
>

            <form onSubmit={methods.handleSubmit(onsubmit)}>
              {steps === 1 && <Stepsonebranding nextstep={nextstep} />}
              {steps === 2 && <Stepstwobranding prevstap={prevstep} />}
              {steps === 3 && <Stepstreebranding brandid={brandids}/>}
            </form>
          </motion.div>
        </div>
      </FormProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ProtectedRoute>
  )
}

export default Branding
