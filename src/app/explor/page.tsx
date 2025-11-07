'use client'
import { Contribute } from "@/components/editbrandcomponents/Contribuot"
import { image } from "@/components/modal/covermodal"
import { useData } from "@/hooks/Datacontext"
import { supabase } from "@/lib/supabaseClinet"
import { useEffect, useState } from "react"


type BrandWithCount = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  coverurl: string;
  profileurl: string;
  description: string;
  contribuot: { count: number }[];
  contrib_count: number;
};

function Explore() {
    const {branddid}=useData()
    
    const [allbrand, setallbrand] = useState<BrandWithCount[] | []>([])
    const fechdata = async () => {
        const { data: getalldata, error: getalleror } = await supabase.from("branding").select(`*,contribuot(count)`)
        if (getalleror) {
            console.error(getalleror);
            return
        }
       const withCounts = getalldata.map((b) => ({
    ...b,
    contrib_count: b.contribuot?.[0]?.count || 0
  }))
  setallbrand(withCounts)
    }
   
    useEffect(() => { fechdata() }, [])

    return (
        <div className="grid  grid-cols-1 md:grid-cols-3 md:gap-5 md:px-20 px-4">
            {allbrand.map((c)=>(<div key={c.id} className="border border-[#E7E7E7] md:border-0 rounded-t-2xl">
                <div className="w-full h-30 rounded-t-2xl">
                    <img src={c.coverurl||"/download.jpg"} alt="" className="w-full h-full rounded-t-2xl object-cover"/>
                </div>
                <div className="flex items-center gap-3 px-4 ">
                    <img src={c.profileurl||"/download.jpg"} alt="" className="w-22 h-22 mt-[-50px] rounded-xl"/>
                    <p className="text-xl font-bold text-[#2D2D2D]">{c.name}</p>
                </div>
                <p className="px-4 mt-4 text-[#959595] font-normal text-base">{c.description}</p>
                <p className="px-4 mt-8 mb-5 text-lg font-semibold text-[#444444]">{c.category} & {c.subcategory}</p>
                <div className="pt-4 border-t  border-t-[#E7E7E7]">
                    <p className="px-4 text-[#717171] font-normal text-base"><span className="text-lg font-semibold text-[#444444]">{c.contrib_count}</span> financial countribuote</p>
                    <p className="px-4 pb-5 text-[#717171] font-normal text-base"><span className="text-lg font-semibold text-[#444444]">$11,558</span> money reased</p>


                </div>
            </div>))}
        </div>
    )
}

export default Explore