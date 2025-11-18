import { supabase } from "@/lib/supabaseClinet"
import { useEffect, useState } from "react"
import Link from "next/link"

type litebrand={
    name:string,
    profileurl:string
    id:string
}
function Allbrand({userid}:{userid:string|undefined}) {
    const [brand,setbrand]=useState<[]|litebrand[]>([])
    const fechdata= async()=>{
        const {data,error}=await supabase.from("branding").select("*").eq("userid",userid)
        if(error){return}
        setbrand(data)
    }
    useEffect(()=>{
      fechdata()
    },[brand,userid])
    

  return (
    <div>
        <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#644FC1] rounded-xs"></div>
            <h1 className="text-[#444444] md:text-2xl text-lg font-semibold text-center">
        Brands
      </h1>
        </div>
        <div className="grid grid-cols-3 gap-5 md:grid-cols-8 md:gap-y-6 md:gap-x-0 mt-6">
          {brand.map((c)=>(
            <Link href={`/Brands/${c.id}`} key={c.id} className="flex flex-col items-center">
              <div className="border border-[#644FC1] border-2 rounded-xl overflow-hidden w-20 h-20 ">
                <img src={c.profileurl} className="w-full object-cover overflow-hidden h-full" alt="" />
              </div>
              <p className="text-center font-medium text-base text-[#444444]">{c.name}</p>
            </Link>
          ))}
        </div>

    </div>
  )
}

export default Allbrand