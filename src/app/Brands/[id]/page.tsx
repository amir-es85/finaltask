'use client'
import ProtectedRoute from "@/components/ProtectedRoute"
import { supabase } from "@/lib/supabaseClinet"
import { useParams } from "next/navigation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import Covermodal, { image } from "@/components/modal/covermodal";
import { useData } from "@/hooks/Datacontext";
import Link from 'next/link';
import Profilemodal from "@/components/modal/profilemodal";
import Contribuot from "@/components/editbrandcomponents/Contribuot";
import Description from './../../../components/editbrandcomponents/Description';
import Teammember from './../../../components/editbrandcomponents/Teammember';

type platformdata = {
  brand_id: string
  label: string
  link: string
  id: string
}

function Brandpage() {
  const contribRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const params = useParams()
  const brandid = params.id 

  const scrollToSection = (ref: React.RefObject<HTMLDivElement|null>) => {
    if (ref.current) {
      const offset = ref.current.getBoundingClientRect().top + window.scrollY - 100; // فاصله از بالا
      window.scrollTo({ top: offset, behavior: "smooth"});
    }
  };

  const [platformdataa, setplatformdata] = useState<platformdata[] | null>(null)
  const { image, setimage,branddid,setbrandid } = useData()

  const fechdata = async () => {
    const { data: imagedata, error: imageeror } = await supabase.from("branding").select("*").eq("id", brandid)
    if (imageeror) {
      console.error(imageeror);
    }
    if (imagedata) {
      setimage(imagedata[0])
    }
  }
  useEffect(() => {
    
    fechdata()
  }, [brandid])
  useEffect(() => {
   
    setbrandid(brandid)
  }, [brandid])

  useEffect(() => {
    const fechdata = async () => {
      const { data: platformdata, error: platformeror } = await supabase.from("branding-platform").select("*").eq("brand_id", brandid)
      setplatformdata(platformdata)
    }
    fechdata()
  }, [brandid])




  return (
    <ProtectedRoute>
      <div className="ml-4 mr-4 flex flex-col  justify-center">
        <div className="bg-gradient-to-r from-[#6E79D6] via-[#9EA9FF] to-[#6E79D6] w-full py-5 px-4 flex flex-col rounded gap-3.5 md:gap-13 md:py-7 md:px-7">
          <Dialog>
            <DialogTrigger className="self-end py-1.5 px-2 font-semibold bg-[#EDE9FE] text-[#644FC1] text-lg border border-2 border-[#AA99EC] rounded outline-0 text-center cursor-pointer md:py-3 md:block md:px-4 md:text-xl">
              Edit Cover
            </DialogTrigger>
            < DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <Covermodal brandid={branddid} />
            </DialogContent>
          </Dialog>
          
          <h2 className="text-[#F5F5F5] text-xl font-bold mt-1 md:text-4xl">Brand or Organization</h2>
          <h3 className="self-end text-white font-normal text-sm mt-5 md:text-lg">000$  totalcontribute</h3>
        </div>
        <div className="flex items-start justify-between w-full px-4">
          <div className="flex items-start gap-4.5 md:gap-10">
            <div className="flex flex-col items-center gap-1 mt-[-40px] md:pl-10 md:mt-[-60px]">
              <div className="relative w-[100px] h-[100px] flex items-center justify-center md:h-[150px] md:w-[150px]">
                {/* تصویر برند */}
                <img
                  src={image?.profileurl}
                  alt="profile"
                  className="w-full h-full object-cover rounded-2xl shadow-md"
                />

                {/* لایه‌ی بنفش و دکمه */}
                <div className="absolute inset-0 flex items-center justify-center  rounded-2xl  ">
                  <Dialog>
                    <DialogTrigger className="bg-white/20 text-white font-medium text-sm px-3 py-1.5 rounded shadow-md border border-white/30 md:px-7 py-2">
                      Edit profile
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <Profilemodal brandid={branddid} fechdata={fechdata}/>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* نام برند */}
              <p className=" text-lg font-semibold text-gray-800">
                {image?.name}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2.5 md:gap-4 md:pt-4">
              {platformdataa && platformdataa.map((platform) => (
                <div key={platform.id} className="flex items-center gap-4 flex-row">
                  <p className="text-sm font-light text-gray-700 md:text-lg hover:text-blue-500"><Link href={platform.link}>{platform.label}</Link></p>
                </div>
              ))}
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 mt-2.5 md:mt-4 md:bg-[#644FC1] md:px-8 md:py-1.5 text-white md:rounded">
            Setting
            <img src="/setting.png" alt="" className="w-5 h-5 object-contain bg-white md:hidden" />
          </button>



        </div>
        <div className="flex justify-center gap-5 md:gap-8 pb-2 border-b-1 border-b-[#E7E7E7] mt-10 ">
          <button onClick={() => scrollToSection(contribRef)} className="text-[#444444] font-medium hover:underline">
            Contribute
          </button>
          <button onClick={() => scrollToSection(descRef)} className="text-[#444444] font-medium hover:underline">
            Description
          </button>
          <button onClick={() => scrollToSection(teamRef)} className="text-[#444444] font-medium hover:underline">
            Team
          </button>
        </div>
        <div className="flex flex-col mt-13 md:mt-23 gap-17 md:gap-30 max-w-5xl w-full mx-auto px-5 md:px-8">
          <div ref={contribRef}><Contribuot /></div>
          <div ref={descRef}><Description /></div>
         <div ref={teamRef}> <Teammember /></div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Brandpage
