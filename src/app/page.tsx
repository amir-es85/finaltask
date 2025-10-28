
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center container px-4 md:px-0">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[#644FC1] text-lg md:text-2xl font-extrabold text-center"
      >
        Create your profile and take the first step towards new opportunities
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="text-[#717171] text-sm mt-3 font-medium text-center max-w-md md:max-w-full"
      >
        By creating your account, you gain access to a thriving community where
        brands and individuals are committed to offering you ongoing support.
        This support network is a valuable resource.
      </motion.p>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0, }}
        transition={{ delay: 0.5, duration: 0.9, type: "spring", stiffness: 80 }}
       
        className="flex flex-col items-center justify-center text-center mt-20 border-2 pt-6 md:pt-15 md:px-10 px-5 pb-6 rounded border-[#644FC1] w-full max-w-md shadow-lg"
      >
        <motion.img
          src="/2.png"
          alt="Brand illustration"
          className="w-32 md:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 , rotate:360}}
          transition={{ delay: 0.7, duration: 0.8 }}
        />

        <motion.h2
          className="mt-16 text-[#644FC1] text-xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Brand or Organization
        </motion.h2>

        <motion.p
          className="text-[#959595] mt-2 font-light text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          If your branding is established and youre looking for continuous
          support, get started now.
        </motion.p>

        <div className="mt-16 flex flex-col items-center w-full">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
            <Link
              href="/branding"
              className="py-2 px-10 md:px-30 bg-[#644FC1] text-white rounded font-semibold text-sm hover:bg-[#5b46b5] w-full  md:w-auto text-center inline-block"
            >
              Start
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/login"
              className="mt-3 font-semibold text-sm text-[#644FC1] hover:underline inline-block"
            >
              Learn more
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
