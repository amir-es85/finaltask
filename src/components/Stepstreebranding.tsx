'use client'
import Link from "next/link";

function Stepstreebranding() {
  return (
    <div className="flex flex-col items-center  text-center md:h-screen px-4 mt">
      {/* dعنوان بالا */}
      <h1 className="text-[#644FC1] text-xl md:text-3xl font-semibold mb-6">
        Congratulation
      </h1>

      {/* تصویر */}
      <div className="flex justify-center mb-8">
        <img
          src="/pic1.svg"
          alt="illustration"
          className="w-56 md:w-72 lg:w-80 max-w-full"
        />
      </div>

      {/* متن پایین */}
      <div className="flex flex-col items-center justify-center max-w-xl">
        <h2 className="text-[#505050] font-medium text-lg md:text-xl mb-3">
          Your creative Starter has been approved by our experts
        </h2>
        <p className="text-[#717171] text-sm md:text-base font-light">
          Welcome aboard! Let’s dive in and get started.
        </p>
        <Link
          href="/"
          className="py-2 px-6 bg-[#644FC1] text-white rounded mt-8 hover:bg-[#5844b5] transition"
        >
          Go to my profile
        </Link>
      </div>
    </div>
  );
}

export default Stepstreebranding;
