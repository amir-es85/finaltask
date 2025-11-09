'use client'

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useData } from "@/hooks/Datacontext"
import { supabase } from "@/lib/supabaseClinet"
import { useEffect, useState } from "react"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"

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
  const [sliderRef, slider] = useKeenSlider({
    loop: false,
    slides: { perView: 1, spacing: 15 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 1, spacing: 0 },
        mode: "free-snap",
        drag: false,
      },
    },
  });

  const { branddid } = useData()
  const [showall, setshowall] = useState(false)
  const [allbrand, setallbrand] = useState<BrandWithCount[]>([])
  const [loading, setLoading] = useState(true)        // فقط برای بار اول
  const [searchTerm, setSearchTerm] = useState("")    // عبارت جستجو

  // ⬇️ تابع گرفتن داده‌ها از Supabase
  const fechdata = async (query?: string, isSearch = false) => {
    if (!isSearch) setLoading(true) // فقط در بار اول لودینگ فعال شه

    let supabaseQuery = supabase.from("branding").select(`*,contribuot(count)`)

    // اگر عبارتی برای جستجو وارد شده
    if (query && query.trim() !== "") {
      supabaseQuery = supabaseQuery.or(
         `name.ilike.%${query}%,category.ilike.%${query}%,subcategory.ilike.%${query}%`
      )
    }

    const { data: getalldata, error: getalleror } = await supabaseQuery

    if (getalleror) {
      console.error(getalleror)
      if (!isSearch) setLoading(false)
      return
    }

    const withCounts = getalldata.map((b) => ({
      ...b,
      contrib_count: b.contribuot?.[0]?.count || 0,
    }))

    if (window.innerWidth >= 768) {
      setallbrand(showall ? withCounts : withCounts.slice(0, 6))
    } else {
      setallbrand(withCounts)
    }

    if (!isSearch) setLoading(false)
  }

  // بار اول (لود اولیه)
  useEffect(() => {
    fechdata(undefined, false)
  }, [showall])

  // جستجو با تاخیر (بدون لودینگ)
  useEffect(() => {
    const delay = setTimeout(() => {
      fechdata(searchTerm, true)
    }, 400)
    return () => clearTimeout(delay)
  }, [searchTerm])

  useEffect(() => {
  if (slider && slider.current) {
    slider.current.update()
  }
}, [allbrand])

  // نمایش لودینگ فقط در لود اولیه
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-[#644FC1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <div className="px-8 md:px-0 md:max-w-6xl mx-auto rounded-2xl w-full">
        <div className="bg-[url('/amir5.png')] bg-center bg-cover md:py-17 py-15 rounded-t-2xl flex items-center justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-10/12 md:w-1/2 bg-white py-2 px-4 rounded-md shadow-md focus:outline-none transition-all"
            placeholder="Search by name, category or subcategory..."
          />
        </div>
      </div>

      <div className="px-10 md:px-1">
        {/* دسکتاپ */}
        <div className="hidden md:grid grid-cols-3 gap-y-9 gap-x-6 max-w-4xl w-full mx-auto ">
          {allbrand.map((c) => (
            <div key={c.id} className="border border-1 border-[#E7E7E7] md:border-0 rounded-t-2xl">
              <div className="md:w-full h-30 rounded-t-2xl">
                <img src={c.coverurl || "/download.jpg"} alt="" className="w-full h-full rounded-t-2xl object-cover" />
              </div>
              <div className="flex items-center gap-3 px-4 ">
                <img src={c.profileurl || "/download.jpg"} alt="" className="w-20 h-20 mt-[-50px] rounded-xl" />
                <p className="text-xl font-bold text-[#2D2D2D]">{c.name}</p>
              </div>
              <p className="px-4 mt-4 text-[#959595] font-normal text-base break-words whitespace-normal">{c.description}</p>
              <p className="px-4 mt-8 mb-5 text-lg font-semibold text-[#444444]">{c.category} & {c.subcategory}</p>
              <div className="pt-4 border-t border-t-[#E7E7E7]">
                <p className="px-4 text-[#717171] font-normal text-base">
                  <span className="text-lg font-semibold text-[#444444]">{c.contrib_count}</span> financial countribuote
                </p>
                <p className="px-4 pb-5 text-[#717171] font-normal text-base">
                  <span className="text-lg font-semibold text-[#444444]">$11,558</span> money reased
                </p>
              </div>
            </div>
          ))}

          <div className="md:flex justify-center mt-5 col-span-full hidden">
            <button
              onClick={() => setshowall(!showall)}
              className="px-4 py-2 rounded hidden md:block mb-20 bg-[#EDE9FE] border border-[#AA99EC] text-[#644FC1] font-medium hover:bg-[#DDD6FE] transition"
            >
              {showall ? "Show less" : "View more"}
            </button>
          </div>
        </div>

        {/* موبایل */}
        <div className="md:hidden">
          <div ref={sliderRef} className="keen-slider">
            {allbrand.map((c) => (
              <div key={c.id} className="keen-slider__slide border border-2 border-[#E7E7E7] md:border-0 rounded-t-2xl">
                <div className="md:w-full h-30 rounded-t-2xl">
                  <img src={c.coverurl || "/download.jpg"} alt="" className="w-full h-full rounded-t-2xl object-cover" />
                </div>
                <div className="flex items-center gap-3 px-4 ">
                  <img src={c.profileurl || "/download.jpg"} alt="" className="w-20 h-20 mt-[-50px] rounded-xl" />
                  <p className="text-xl font-bold text-[#2D2D2D]">{c.name}</p>
                </div>
                <p className="px-4 mt-4 text-[#959595] font-normal text-base break-words whitespace-normal">{c.description}</p>
                <p className="px-4 mt-8 mb-5 text-lg font-semibold text-[#444444]">{c.category} & {c.subcategory}</p>
                <div className="pt-4 border-t border-t-[#E7E7E7]">
                  <p className="px-4 text-[#717171] font-normal text-base">
                    <span className="text-lg font-semibold text-[#444444]">{c.contrib_count}</span> financial countribuote
                  </p>
                  <p className="px-4 pb-5 text-[#717171] font-normal text-base">
                    <span className="text-lg font-semibold text-[#444444]">$11,558</span> money reased
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-5 mt-7">
            <button onClick={() => slider?.current?.prev()} className="px-2 py-2 rounded-lg bg-[#EDE9FE] border border-[#AA99EC] text-[#644FC1] hover:bg-[#DDD6FE] transition"><HiArrowLeft size={28} /></button>
            <button onClick={() => slider?.current?.next()} className="px-2 py-2 rounded-lg bg-[#EDE9FE] border border-[#AA99EC] text-[#644FC1] hover:bg-[#DDD6FE] transition"><HiArrowRight size={25} /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
