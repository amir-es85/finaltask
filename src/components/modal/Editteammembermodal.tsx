import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { teammember } from "../editbrandcomponents/Teammember"
import { supabase } from "@/lib/supabaseClinet"
import { toast } from "react-toastify"
import { FiEdit2 } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { Controller, useForm } from "react-hook-form"
import { TeamMemberInsert } from "./Createteammembermodal"


function Editteammembermodal({ id , fechdata}: { id: number,fechdata:()=>void }) {
    const [temmembers, setteammember] = useState<teammember | null>(null)
    const {register,control,handleSubmit,reset}=useForm<TeamMemberInsert>()
    const fechdata2 = async () => {
        const { data: getdata, error: geteror } = await supabase.from("teammember").select("*").eq("id", id)
        if (geteror) {
            toast.error(geteror.message)
            return
        }
        setteammember(getdata[0])
    }
    useEffect(() => { fechdata2() }, [id])
    const onsubmit=async(data:TeamMemberInsert)=>{
const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "")
  );
  const {data:postdata , error:posteror}=await supabase.from("teammember").update(cleanedData).eq("id",id)
  if(posteror){
    toast.error(posteror.message)
    return
  }
  toast.success("sucses")
  fechdata2()
  fechdata()
  reset()
    }
    const handeldelete=async()=>{
        const {data:deletedata , error:deleteeror}=await supabase.from("teammember").delete().eq("id",id)
        if(deleteeror){
            toast.error(deleteeror.message)
            return
        }
        toast.success("teammember deleted is sucses")
        fechdata()

    }
    return (
        <div className="flex items-center justify-center gap-8 md:flex-row flex-col">
    {/* فرم در بخش اول */}
    <div className="shadow-2xl flex-2 rounded-2xl h-full sm:h-[auto]">
        <h1 className="border border-b-[#E7E7E7] text-[#444444] font-medium text-lg text-center">
            Team member
        </h1>

        <form
            className="flex flex-col gap-3 px-7 pt-7 pb-3.5"
            onSubmit={handleSubmit(onsubmit)}
        >
            <div className="w-full">
                <label className="text-left text-sm font-light text-[#444444]">Name</label>
                <Input
                    className="border border-[1.5px] border-[#8D75F7] w-full"
                    {...register("name")}
                />
            </div>

            <div className="w-full">
                <label className="text-left text-sm font-light text-[#444444]">Role</label>
                <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select {...field}>
                            <SelectTrigger className="border border-[1.5px] border-[#8D75F7] w-full">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            <div className="w-full">
                <label className="text-left text-sm font-light text-[#444444]">Email</label>
                <Input
                    className="border border-[1.5px] border-[#8D75F7] w-full"
                    {...register("emailadres")}
                />
            </div>

            <div className="w-full">
                <label className="text-left text-sm font-light text-[#444444]">Description</label>
                <textarea
                    className="border border-[1.5px] border-[#8D75F7] rounded-md p-2 resize-none h-20 w-full"
                    {...register("description")}
                ></textarea>
            </div>

            {/* 🔧 دکمه‌ها اصلاح‌شده */}
            <div className="flex justify-between items-start mt-7 w-full">
                {/* سمت چپ */}
                <div className="flex gap-5">
                    <button
                        type="button"
                        className="px-2 py-1.5 rounded-md bg-[#EDE9FE] border hover:opacity-50 border-[#AA99EC] text-[#644FC1] font-medium hover:bg-[#DDD6FE] transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-1.5 rounded-md bg-[#644FC1] text-white font-medium hover:shadow-md transition hover:opacity-50"
                    >
                        Save
                    </button>
                </div>

                {/* سمت راست */}
                <button type="button" onClick={handeldelete} className="self-end px-4 py-1.5 rounded-md bg-red-600 border hover:opacity-50 border-[#AA99EC] text-white font-medium  transition">Delete</button>
            </div>
        </form>
    </div>

    {/* بخش دوم (Preview) */}
    <div className="flex-1 flex flex-col shadow-2xl rounded-2xl sm:h-[auto] h-full">
        <h1 className="border border-b-[#E7E7E7] text-[#444444] font-medium text-lg text-center w-full">
            Preview
        </h1>

        <div className="flex items-center justify-center px-7 pt-12 pb-3.5 self-center">
            <div className="relative bg-white border border-[#C7C6C6] rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                

                <div className="flex relative items-center justify-center w-[100px] h-[100px] rounded-full mb-4 overflow-hidden">
                    {temmembers?.image_url ? (
                        <img
                            src={temmembers?.image_url}
                            alt={temmembers.name}
                            className="w-full absolute inset-0 h-full object-cover"
                        />
                    ) : (
                        <FaUserCircle className="text-[#B9A8FF] text-[80px]" />
                    )}
                </div>

                <h2 className="text-[#444444] font-semibold text-lg mb-2">
                    {temmembers?.name}
                </h2>

                <div className="bg-[#F0EFEF] text-[#666666] text-sm px-4 py-1 rounded-full mb-3">
                    {temmembers?.role || "Member"}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-1 px-2">
                    {temmembers?.description
                        ? temmembers?.description
                        : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                </p>
            </div>
        </div>
    </div>
</div>


    )
}

export default Editteammembermodal