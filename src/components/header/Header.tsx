'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClinet';
import { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import {HoverCard,HoverCardContent,HoverCardTrigger}from '@/components/ui/hover-card'
import Hover, { username } from './hover';
function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessioon ,setsession]=useState<Session|null>(null)
  const [user , setuser]=useState<username|null|undefined>(null)
  const router = useRouter()
  const username =(data:username)=>{
    setuser(data)

  }
  
 async function auth (){
  
   const { data: { session } } = await supabase.auth.getSession()
   setsession(session)
 }
 useEffect(()=>{auth()
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setsession(session) // هر تغییری در login/logout بلافاصله اعمال میشه
    })

  
    return () => {
      listener.subscription.unsubscribe()
    }
 },[])
 const fristname = user?.fristname[0].toUpperCase()
 const lastname = user?.lastname[0].toUpperCase()
  return (
    <motion.div
    initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 120
      }}
    className="fixed top-0 left-0 w-full z-50 bg-white md:px-10 px-5 md:py-2 py-1.5 border-b border-b-1 border-[#D7CFF9] flex items-center justify-between">
  

  <div className="flex items-center">
    <img className="w-full" src="/ggg.svg" alt="Logo" />
  </div>


  <ul className="md:flex items-center justify-center gap-4 hidden">
    <li className="text-[#444444] font-medium text-base"><Link href="/">Home</Link></li>
    <li className="text-[#444444] font-medium text-base"><Link href="/explor">Explore</Link></li>
    <li className="text-[#444444] font-medium text-base"><Link href="/">About us</Link></li>
    <li className="text-[#444444] font-medium text-base"><Link href="/">Helps & Support</Link></li>
  </ul>


  <div className="flex items-center gap-6">
    {sessioon ? (
     <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCardTrigger
      onClick={() => setOpen(!open)}
       className='w-10 h-10 flex items-center justify-center bg-[#EDE9FE] py-2 cursor-pointer rounded-full border border-2 text-[#644FC1] font-semibold border-[#D7CFF9]'>{fristname||"F"}{lastname||"N"}</HoverCardTrigger>
      <HoverCardContent><Hover usernamee={username}/></HoverCardContent>
     </HoverCard>
    ) : (
      <li className="bg-[#270F94] text-white py-2 px-5 transition rounded-xl font-semibold hover:opacity-50 text-base">
        <Link href="/login">Login</Link>
      </li>
    )}
    <button className="md:hidden "onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes className="h-6 w-6 text-[#270F94]" /> : <FaBars className="h-6 w-6 text-[#270F94]" />}</button>
  </div>

  <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "60vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white rounded-b-2xl shadow-lg overflow-hidden md:hidden"
          >
            <div className="flex flex-col justify-between h-full p-6">
         
              <div className="flex flex-col gap-6 mt-4 text-lg font-medium text-[#270F94]">
                <Link href="/explor" className="flex items-center justify-between">
                  Explore <FaArrowRight />
                </Link>
                <Link href="/" className="flex items-center justify-between">
                  Home <FaArrowRight />
                </Link>
                <Link href="/" className="flex items-center justify-between">
                  About us <FaArrowRight />
                </Link>
                <Link href="/" className="flex items-center justify-between">
                  Help & Support <FaArrowRight />
                </Link>
              </div>

            
              <div className="flex flex-col gap-5 mt-10">
               
                  <Button
                    variant="outline"
                    className="border-[#270F94] text-[#270F94] w-full rounded-xl"
                    onClick={() => {router.push("/login"),setMenuOpen(false)}}
                  >
                    Login / Signup
                  </Button>
                
                <Button onClick={()=>{setMenuOpen(false),router.push("/branding")}} className="bg-[#644FC1] w-full rounded-xl text-white font-semibold py-2">
                  Start
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

</motion.div>
  )
}

export default Header
