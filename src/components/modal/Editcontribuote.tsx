import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl} from "@/components/ui/form";
import { Input } from "../ui/input";
import { supabase } from "@/lib/supabaseClinet";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface updateform{
  name:string,
  deckription:string,
  amont:string
} 
function Editcontribuote({ id ,setopenmodal,handleItemDeleted }: { id: number,setopenmodal:React.Dispatch<React.SetStateAction<boolean>>,handleItemDeleted:(id:number)=>void }) {
  const [ditaa , setdataa]=useState<updateform|null>(null)
  const fechdata=async()=>{
    if(!id){return}
    const {data:getdata , error:geteror}=await supabase.from("contribuot").select("*").eq("id",id)
    if(geteror||!getdata){
      toast.error(geteror.message)
    }
    if(getdata){
    setdataa(getdata[0])}
  }
  useEffect(()=>{if(id)fechdata()}
  ,[id])
  
    
  const methods = useForm<updateform>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      deckription:"",
      amont: ""
    }
  })
  const onsubmit = async (formdata: updateform) => {
    const filterdata=Object.fromEntries(
      Object.entries(formdata).filter(([_, value])=> value !== "" && value!==null && value!== undefined)
    )
    if(Object.keys(filterdata).length === 0){
      toast.warning("not fild asembel")
      return
    }
    const {error:uploderor}= await supabase.from("contribuot").update(filterdata).eq("id",id)
    if(uploderor){
      toast.error(uploderor.message)
    }
    else{
      toast.success("update successful")
    }
  }
  const handeldelete = async()=>{
if(!id){
  toast.error("ffff")
  return
}
const {error:deleteeror}= await supabase.from("contribuot").delete().eq("id",id)
if(deleteeror){
  toast.error(deleteeror.message)
}
else{toast.success("Contribution deleted successfully!")
  handleItemDeleted?.(id)
  setopenmodal(false)
}
  }
  useEffect(()=>{
    if(!id)return
    const chanel =supabase.channel("realtimecontribuot").on("postgres_changes",
      {
        event:"*",
        schema: "public",
        table: "contribuot",
        filter: `id=eq.${id}`
      },
      (paylode)=>{
        fechdata()
      }
    ).subscribe();
    return ()=>{supabase.removeChannel(chanel).then(()=>{
      console.log("f"); 
    })}

  },[id])
  
  return (
   <div className="flex flex-col md:flex-row-reverse items-start justify-between gap-8 bg-white rounded-2xl  p-8">

  {/* ✅ Preview Section */}
  <div className="w-full md:w-1/2 flex flex-col items-center">
    <h2 className="text-[#644FC1] font-bold text-lg mb-4">Preview</h2>
    <div className="w-full shadow-md hover:shadow-xl transition rounded-xl border border-gray-200 overflow-hidden">
      <h3 className="bg-[#644FC1] text-white text-center text-base font-semibold py-2">
        {ditaa?.name || "Contribution"}
      </h3>

      <div className="p-6 flex flex-col items-start">
        <h4 className="text-[#444] font-medium text-lg text-center w-full mb-3">
          You are on the list
        </h4>
        <p className="text-[#444] font-semibold text-lg mb-3">
          Start at <span className="text-[#644FC1]">{ditaa?.amont || "0"}</span>
        </p>
        <p className="text-sm text-gray-500 break-words break-all whitespace-normal w-full">
          {ditaa?.deckription || "No description available."}
        </p>
      </div>
    </div>
  </div>

  {/* ✅ Form Section */}
  <div className="w-full md:w-1/2">
    <Form {...methods}>
      <form
        className="space-y-5 rounded-xl border border-gray-200 p-8 shadow-md bg-white"
        onSubmit={methods.handleSubmit(onsubmit)}
      >
        <h2 className="text-[#644FC1] text-center font-bold text-xl mb-2">
          Tier Type
        </h2>

        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-2 border-[#644FC1] focus:ring-2 focus:ring-[#644FC1] rounded-md"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="deckription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-2 border-[#644FC1] focus:ring-2 focus:ring-[#644FC1] rounded-md"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="amont"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-2 border-[#644FC1] focus:ring-2 focus:ring-[#644FC1] rounded-md"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={handeldelete}
            className="px-4 py-2 rounded-md bg-[#EDE9FE] border border-[#AA99EC] text-[#644FC1] font-medium hover:bg-[#DDD6FE] transition"
          >
            Delete
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-[#644FC1] text-white font-medium hover:shadow-md transition"
          >
            Save
          </button>
        </div>
      </form>
    </Form>
  </div>
</div>


  )
}

export default Editcontribuote