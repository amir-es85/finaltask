import { supabase } from "@/lib/supabaseClinet"
import { div, embed, img } from "framer-motion/client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { FaUserCircle, FaBriefcase, FaPlus, FaCog,FaSignOutAlt } from "react-icons/fa";
import { image } from "../modal/covermodal";
import  Link  from 'next/link';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "react-toastify";


export interface username {
    fristname: string,
    lastname: string,
    userid: string
}

function Hover({usernamee}:{usernamee:(username:username)=>void}) {
    const [open, setOpen] = useState(false)
    const [emaiil, setemail] = useState<string | null | undefined>(null)
    const [userid, setuserid] = useState<string | null | undefined>(null)
    const [username, setusername] = useState<null | undefined | username>(null)
    const [brand, setbrand] = useState<image[] | []>([])
    const router = useRouter()


    const handeldeleteuser= async ()=>{
        const {error}=await supabase.auth.signOut()
        if(error){toast.error(error.message)}
        setOpen(false)
    }
    const getbrand = async () => {
        const { data: branddata, error: branderor } = await supabase.from("branding").select("*").eq("userid", userid)
        if (branderor) return
        setbrand(branddata)
    }
    const getemail = async () => {
        const { data: emaildata, error: emaileror } = await supabase.auth.getUser()
        if (emaileror) return
        const email = emaildata.user?.email
        setemail(email)
        setuserid(emaildata.user.id)
    }
    const getusername = async () => {
        const { data: userdata, error: eroruser } = await supabase.from("profiles").select("*").eq("userid", userid)
        if (eroruser) return
        setusername(userdata[0])
    }
    if(username){
        usernamee(username)
    }

    useEffect(() => { getemail(), getusername(),getbrand() }, [userid, username, emaiil])


    return (

        <div>
            <div className="flex items-center gap-2 border-b border-b-1 border-[#E7E7E7] pb-2">
                {/* آیکون پروفایل */}
                <div className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border-2 bg-[#F6F4FF] border-[#D7CFF9]">
                    <FaUserCircle className="w-full h-full text-[#B9A8FF]" />
                </div>

                {/* اطلاعات کاربر */}
                <div className="flex flex-col leading-tight">
                    <h2 className="text-[#444444] font-semibold text-sm">
                        {username?.fristname} {username?.lastname}
                    </h2>
                    <h4 className="text-[#959595] font-medium text-xs">{emaiil}</h4>
                </div>
            </div>
            <div className="pt-4 flex flex-col gap-4 justify-center">
                <div className="flex items-center gap-2"><FaUserCircle className="text-2xl text-[#959595]" />
                    <p className="text-sm text-[#505050] font-medium">My profile</p></div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaBriefcase className="text-xl text-[#959595]" />
                        <p className="text-sm text-[#505050] font-medium">My brand or organization</p>
                    </div>
                    <button onClick={() => router.push("/branding")}>
                        <FaPlus className="text-sm text-[#959595] hover:text-blue-400 cursor-pointer" />
                    </button>
                </div>
               <div className="flex flex-col gap-2 mt-[-7px] pl-2">
                {brand&&brand.map((c)=>(
              
                <Link key={c.id} className="flex items-center gap-2.5 " href={`/Brands/${c.id}`}><img src={c.profileurl} alt="" className="w-6 h-6 rounded-full" />
                <p className="text-xs text-[#505050] font-normal">{c.name}</p></Link>
              
            
               ))}
               </div>
               <div className="flex items-center gap-2">
                <FaCog className="text-xl text-[#959595]"/>
                 <p className="text-sm text-[#505050] font-medium">Setting</p>
               </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
  <button className="flex items-center gap-2 group transition-colors duration-500 hover:bg-[#fff0f0] rounded-md px-2 py-1">
    <FaSignOutAlt className="text-xl text-[#8a8a8a] group-hover:text-[#e45c5c]" />
    <p className="text-sm text-[#555555] font-medium group-hover:text-[#e45c5c]">
      Sign out
    </p>
  </button>
</DialogTrigger>
<DialogContent className="sm:max-w-[380px] rounded-2xl bg-white shadow-2xl border border-[#EAEAEA]">
    <DialogHeader className="text-center space-y-2">
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-full bg-[#FFF0F0] flex items-center justify-center">
          <FaSignOutAlt className="text-[#E75858] text-2xl" />
        </div>
      </div>

      <DialogTitle className="text-lg font-semibold text-[#2E2E2E]">
        Log out of your account?
      </DialogTitle>

      <DialogDescription className="text-[#6F6F6F] text-sm leading-relaxed">
        Youll need to sign back in to access your dashboard again.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="flex justify-center gap-3 mt-5">
      <DialogClose asChild>
        <Button
        variant="outline"
        className="w-28 rounded-full border-[#D7CFF9] text-[#505050] hover:bg-[#F6F4FF] transition-colors"
      >
        Cancel
      </Button>
      </DialogClose>
      <Button onClick={handeldeleteuser}
        className="w-28 rounded-full bg-[#E75858] hover:bg-[#D84C4C] text-white shadow-md transition-all"
      >
        Log out
      </Button>
    </DialogFooter>
  </DialogContent>
              </Dialog>

            </div>

        </div>

    )
}

export default Hover