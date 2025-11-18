'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useData } from "@/hooks/Datacontext"
import { supabase } from "@/lib/supabaseClinet"
import { useEffect, useState } from "react"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"
import Link from "next/link"


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
  const [categorifilter, setcategorifilter] = useState<string>("")
  const [cuntry, setcuntry] = useState("")
  const [order, setorder] = useState("")

  // ⬇️ تابع گرفتن داده‌ها از Supabase
  const fechdata = async (query?: string, isSearch = false) => {
    if (!isSearch) setLoading(true) // فقط در بار اول لودینگ فعال شه

    let supabaseQuery = supabase.from("branding").select(`*,contribuot(count)`)

    // اگر عبارتی برای جستجو وارد شده
    if (query && query.trim() !== "") {
      supabaseQuery = supabaseQuery.or(
        `name.ilike.%${query}%,category.ilike.%${query}%`
      )
    }
    if (categorifilter && categorifilter !== "all") {
      supabaseQuery = supabaseQuery.eq("category", categorifilter);
    }
    if (cuntry && cuntry !== "all") {
    supabaseQuery = supabaseQuery.eq("countries", cuntry);
  }

  if (order === "newest") {
  supabaseQuery = supabaseQuery.order("created_at", { ascending: false });
} else if (order === "oldest") {
  supabaseQuery = supabaseQuery.order("created_at", { ascending: true });
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
  useEffect(() => {

    fechdata(searchTerm, true)
  }, [categorifilter, searchTerm,cuntry,order])

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
      <div className="px-3 md:px-0 md:max-w-6xl mx-auto rounded-2xl w-full mt-5 mb-30 md:mb-20">
        <div className="bg-[url('/amir5.png')] bg-center bg-cover md:py-17 py-15 rounded-t-2xl flex items-center justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-10/12 md:w-1/2 bg-white py-2 px-4 rounded-md shadow-md focus:outline-none transition-all"
            placeholder="Search"
          />
        </div>
        <div className="shadow-md rounded-b-2xl  pb-10">
          <h2 className="text-[#644FC1] text-lg font-bold md:text-2xl mt-4 text-center">Categories&Subcategories</h2>
          <div className="flex md:flex-row flex-col items-center justify-center mt-6 gap-6.5 px-4 md:px-37 ">
            <Select value={categorifilter} onValueChange={setcategorifilter}>
              <SelectTrigger className="border border-[#644FC1] border-2 px-5 py-1.5 w-full bg-[#F5F5F5] text-[#644FC1]
             focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium">
                <SelectValue placeholder="Art" className="[&>span]:text-[#644FC1] font-bold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="sculpture">Sculpture</SelectItem>
                <SelectItem value="Digital Art">Digital Art</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categorifilter} onValueChange={setcategorifilter}>
              <SelectTrigger className="border w-full border-[#644FC1] border-2 px-5 py-1.5 bg-[#F5F5F5] text-[#644FC1]
             focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium">
                <SelectValue placeholder="Business" className="[&>span]:text-[#644FC1] font-bold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="management">Management</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categorifilter} onValueChange={setcategorifilter}>
              <SelectTrigger className="border w-full border-[#644FC1] border-2 px-5 py-1.5 bg-[#F5F5F5] text-[#644FC1]
             focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium">
                <SelectValue placeholder="Technology" className="[&>span]:text-[#644FC1] font-bold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Ai">Ai</SelectItem>
                <SelectItem value="web development">Web Development</SelectItem>
                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categorifilter} onValueChange={setcategorifilter}>
              <SelectTrigger className="border w-full border-[#644FC1] border-2 px-5 py-1.5 bg-[#F5F5F5] text-[#644FC1]
             focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium">
                <SelectValue placeholder="Education" className="[&>span]:text-[#644FC1] font-bold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Teaching">Teaching</SelectItem>
                <SelectItem value="Academic Research">Academic Research</SelectItem>
                <SelectItem value="Educational Technology">Educational Technology</SelectItem>
                <SelectItem value="Coaching & Mentoring">Coaching & Mentoring</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center gap-8 mt-7 w-full md:w-auto">
            <Select value={cuntry} onValueChange={setcuntry}>
              <SelectTrigger className="border w-full md:w-auto border-[#644FC1] border-2  bg-white px-5 py-1.5 text-[#644FC1] focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium">
                <SelectValue placeholder="Country" className="[&>span]:text-[#644FC1] font-bold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="iran">Ir</SelectItem>
                <SelectItem value="USA">Usa</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Japan">Japan</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={order} onValueChange={setorder}>
              <SelectTrigger className="border w-full md:w-auto border-[#644FC1] border-2  bg-white px-5 py-1.5 text-[#644FC1] focus:outline-none focus:ring-0 focus:ring-offset-0 font-medium">
                <SelectValue placeholder="Sort by" className="[&>span]:text-[#644FC1] font-bold" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="newest">Newest</SelectItem>
      <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>

          </div>

        </div>
      </div>

      <div className="px-10 md:px-1">
        {/* دسکتاپ */}
        <div className="hidden md:grid grid-cols-3 gap-y-9 gap-x-6 max-w-4xl w-full mx-auto mb-10">
          {allbrand.map((c) => (
            <Link href={`/Brands/${c.id}`} key={c.id} className="border border-1 border-[#E7E7E7] md:border-0 rounded-t-2xl">
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
            </Link>
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
        <div className="md:hidden  md:mb-0">
          <div ref={sliderRef} className="keen-slider">
            {allbrand.map((c) => (
              <Link  href={`/Brands/${c.id}`}  key={c.id} className="keen-slider__slide border border-2 border-[#E7E7E7] md:border-0 rounded-t-2xl">
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
                  <p className="px-4 pb-2 text-[#717171] font-normal text-base">
                    <span className="text-lg font-semibold text-[#444444]">$11,558</span> money reased
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-5 mt-7 mb-20">
            <button onClick={() => slider?.current?.prev()} className="px-2 py-2 rounded-lg bg-[#EDE9FE] border border-[#AA99EC] text-[#644FC1] hover:bg-[#DDD6FE] transition"><HiArrowLeft size={28} /></button>
            <button onClick={() => slider?.current?.next()} className="px-2 py-2 rounded-lg bg-[#EDE9FE] border border-[#AA99EC] text-[#644FC1] hover:bg-[#DDD6FE] transition"><HiArrowRight size={25} /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
