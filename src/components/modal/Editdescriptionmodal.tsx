"use client"


import { Button } from "../ui/button"
import { supabase } from "@/lib/supabaseClinet"
import { toast } from "react-toastify"
import { useData } from "@/hooks/Datacontext"
import { useForm } from "react-hook-form"

export default function Editdescriptionmodal({fechdata,setopen}: {fechdata: () => void,setopen: (open: boolean) => void}) {
const {register,handleSubmit,formState:{errors ,isSubmitting ,isValid}}=useForm<{description:string}>({
  mode:"onChange",
    defaultValues: {
        description: ""
    }
})
    const { branddid } = useData()
    const onSubmit = async (formdata: { description: string }) => {
        const { data, error } = await supabase.from("branding").update({ description: formdata.description }).eq("id", branddid)
        if (error) {
            toast.error(error.message)
        }
       
            toast.success("Description updated successfully")
        fechdata()
        setopen(false)
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[#644FC1] text-center font-bold text-xl mb-2">About</h1>
        <div className="flex flex-col gap-2">
            <label className="text-[#444444] font-medium text-sm">Description</label>
            <textarea className="border border-[#644FC1] rounded-md p-2 resize-none h-20" 
            {...register("description", { required: "description is required" })}
            />
            {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
        </div>
        <div className="flex justify-end mt-4">
            <Button  type="submit" disabled={isSubmitting || !isValid} className="bg-[#644FC1] disabled:opacity-50 text-white px-4 py-2 rounded-md">{isSubmitting ? "Saving..." : "Save"}</Button>
        </div>
    </form>
  )
}
