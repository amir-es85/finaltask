import { useForm } from "react-hook-form"
import { Dialog,DialogTrigger,DialogContent, DialogClose } from "../ui/dialog"
import { supabase } from "@/lib/supabaseClinet"
import { useData } from "@/hooks/Datacontext"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { FiEdit2 } from "react-icons/fi";
import Editquestion from './../modal/Editquestion';

interface form {
    question:string,
    anwser:string
}
interface getdata {
    id:number
    brandid:string
}
interface c extends form,getdata {}
function Question({isOwner}:{isOwner:boolean}) {
    const {branddid}=useData()
    const [question,setquestion]=useState<c[]>([])
    const {register,handleSubmit,formState:{errors,isValid,isSubmitting}}= useForm<form>(
        {mode:"onChange"}
    )
    const onsubmit= async(data:form)=>{
const {data:insetdata,error:inseteror}= await supabase.from("Question").insert([{
    anwser:data.anwser,
    question:data.question,
    brandid:branddid
    }])
if(inseteror){toast.error(inseteror.message) 
    return}
toast.success("created sucses question and anwser")
fechdata()
  
    }
    const fechdata= async()=>{
        const {data , error}= await supabase.from("Question").select("*").eq("brandid",branddid)
        if(error)return
        setquestion(data)
    }
    useEffect(()=>{fechdata()},[branddid])
  return (
    <div>
         <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#644FC1] rounded-xs"></div>
            <h1 className="text-[#444444] md:text-2xl text-lg font-semibold text-center">
        FAQ
      </h1>
        </div>
        <div>
            <Accordion type="single" collapsible className="flex flex-col gap-5 mt-6 mb-4">
{question.map((c)=>(
    <AccordionItem key={c.id} value={String(c.id)} className="flex flex-row-reverse gap-5 items-center justify-center">
        <Dialog>
            {isOwner&&(
                <DialogTrigger asChild>
<button className="w-9 h-9 flex items-center justify-center border border-[#8D75F7] rounded">
  <FiEdit2 size={16}  color="#505050"/>
</button>
            </DialogTrigger>
            )}
            <DialogContent>
                <Editquestion id={c.id} fechdata={fechdata}/>
            </DialogContent>
        </Dialog>
       
       <div className="flex-1">
         <AccordionTrigger className="border border-[#8D75F7] border-1 text-[#505050] px-2 py-3 focus:text-[#644FC1] focus:bg-[#EDE9FE] focus:border-2">
            {c.question}
        </AccordionTrigger>
        <AccordionContent className="">
     
       <div className="shadow-md p-4 bg-white rounded  mt-5 rounded py-6 px-4 mb-3 border border-[#E7E7E7] border-[1px]">
    {c.anwser}
  </div>
      
    </AccordionContent>
       </div>
    </AccordionItem>
))}
            </Accordion>
        </div>
       <div className="flex items-center justify-center">
        <Dialog>
            {isOwner&&(
                <DialogTrigger asChild>
                <button className="bg-[#F5F5F5] rounded text-[#717171]  font-normal text-base py-1.5 hover:opacity-50 border px-2.5 border-[#C7C6C6]   transition-colors disabled:opacity-50">+ Add question</button>
            </DialogTrigger>
            )}
            <DialogContent>
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
                        <DialogClose
            
            
            className="px-2 py-1 rounded-md bg-[#EDE9FE] border  hover:opacity-50 border-[#AA99EC] text-[#644FC1] font-normal hover:bg-[#DDD6FE] transition"
          >
            Cancel
          </DialogClose>
          <button
            type="submit"
            disabled={isSubmitting||!isValid}
            className="px-6 py-1 disabled:opacity-50 rounded-md bg-[#644FC1] text-white font-normal hover:shadow-md transition hover:opacity-50"
          >
            Save
          </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        
       </div>
    </div>
  )
}

export default Question