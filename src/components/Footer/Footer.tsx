'use client'
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.div
    initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 120
      }} className=" w-full bg-[#F5F5F5] py-7 pt-6 pb-3">
<div className="flex w-full justify-between md:w-1/2 md:pl-20 px-6 md:px-0 gap-5 md:gap-0">
    <div className="flex flex-col gap-3">
        <p className="text-[#444444] font-medium text-base mb-2.5">ABOUT</p>
        <p className="text-[#444444] font-normal text-sm">about us</p>
        <p className="text-[#444444] font-normal text-sm">contact us</p>

    </div>
    <div className="flex flex-col gap-3">
        <p className="text-[#444444] font-medium text-base mb-2.5">RESOURSES</p>
        <p className="text-[#444444] font-normal text-sm">blog</p>
        <p className="text-[#444444] font-normal text-sm">how to 3f work?</p>
        <p className="text-[#444444] font-normal text-sm">help&support</p>

    </div>
    <div className="flex flex-col gap-3">
        <p className="text-[#444444] font-medium text-base mb-2.5">CONTRIBIOTING</p>
        <p className="text-[#444444] font-normal text-sm">brand&organization</p>
        <p className="text-[#444444] font-normal text-sm">pricing</p>
        
    </div>

</div>
<div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-5 border-t border-t-[#AA99EC] md:px-6">
    <div className="flex gap-4 items-center md:justify-start justify-between">
        <p className="text-sm font-normal text-[#444444]">Trust&safety</p>
        <p className="text-sm font-normal text-[#444444]">Terms of use</p>
        <p className="text-sm font-normal text-[#444444]">Privaci policy</p>
    </div>
    <div className="flex items-center gap-4 md:justify-start justify-between mt-5 md:mt-0 ">
        <FaTwitter size={20} color="#444444" />
  <FaLinkedin size={20} color="#444444" />
  <FaGithub size={20} color="#444444" />
    </div>
</div>
    </motion.div>
  )
}

export default Footer