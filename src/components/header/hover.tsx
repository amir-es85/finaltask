import { supabase } from "@/lib/supabaseClinet"
import { embed } from "framer-motion/client";
import { useEffect, useState } from "react";


function Hover() {
    const [emaiil , setemail]=useState<string|null|undefined>(null)
    const getemail = async()=>{
        const{data:emaildata , error:emaileror}=await supabase.auth.getUser()
        if(emaileror)return
        const email = emaildata.user?.email
        setemail(email)
    }
    const getusername= async()=>{
        const {}=await supabase.from("profiles").select("*")
    }
    
    useEffect(()=>{getemail()},[])
   
    
  return (
    <div>hover</div>
  )
}

export default Hover