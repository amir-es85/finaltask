import { useForm } from "react-hook-form"
import { Dialog,DialogTrigger,DialogContent, DialogClose } from "../ui/dialog"
import { supabase } from "@/lib/supabaseClinet"
import { useData } from "@/hooks/Datacontext"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { FiEdit2 } from "react-icons/fi";
interface form {
    question:string,
    anwser:string
}
interface getdata {
    id:number
    brandid:string
}
interface c extends form,getdata {}
function Editquestion({id,fechdata}:{id:number,fechdata:()=>void}) {
     const {register,handleSubmit,formState:{errors,isValid,isSubmitting}}= useForm<form>(
            {mode:"onChange"}
        )
        const onsubmit = async(data:form)=>{
            const {error}=await supabase.from("Question").update({
anwser:data.anwser,
    question:data.question
            }).eq("id",id)
            if(error){toast.error(error.message) 
                return}
            toast.success("ddd")
            fechdata()
        }
        const Delete = async()=>{
            const {error}= await supabase.from("Question").delete().eq("id",id)
            if(error){
                toast.error(error.message) 
                return
            }
            toast.success("sucses")
            fechdata()
        }
    
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6 mt-3">
                        <div  className="flex flex-col gap-1.5">
                            <label className="text-sm text-[#444444] font-normal">Question</label>
                            <div>
                                <input type="text" {...register("question",{required:"question is required"})} className="w-full py-1 border outline-0 rounded border-[1px] border-[#8D75F7]"/>
                            {errors.question&&(<p className="text-sm text-red-600 ">{errors.question.message}</p>)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-[#444444] font-normal">Answer</label>
                            <div>
                                <input type="text" {...register("anwser",{required:"anwser is required"})} className="w-full py-1 border outline-0 rounded border-[1px] border-[#8D75F7]"/>
                            {errors.anwser&&(<p className="text-sm text-red-600 ">{errors.anwser.message}</p>)}
                            </div>
                        </div>
                        <div className="flex gap-3.5 mt-5 self-end">
                            <button
                
                onClick={Delete}
                className="px-2 py-1 rounded-md bg-[#EDE9FE] border  hover:opacity-50 border-[#AA99EC] text-[#644FC1] font-normal hover:bg-[#DDD6FE] transition"
              >
                Delete
              </button>
              <button
                type="submit"
                disabled={isSubmitting||!isValid}
                className="px-6 py-1 disabled:opacity-50 rounded-md bg-[#644FC1] text-white font-normal hover:shadow-md transition hover:opacity-50"
              >
                Save
              </button>
                        </div>
                    </form>
  )
}

export default Editquestion