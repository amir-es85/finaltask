
import Link from 'next/link';

export default function Home() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center px-4 md:px-0 container">
      {/* Header */}
      <h2 className="text-[#644FC1] text-lg md:text-2xl font-extrabold text-center md:text-center">
        Create your profile and take the first step towards new opportunities
      </h2>
      <p className="text-[#717171] text-sm md:text-base mt-3 font-medium text-center max-w-2xl">
        By creating your account you gain access to a thriving community where brands and individuals are committed to offering you ongoing support. This support network is a valuable resource.
      </p>

      {/* Card */}
      <div className="flex flex-col items-center justify-center text-center mt-12 md:mt-20 border border-[#644FC1] rounded-lg px-5 md:px-10 py-8 md:py-12 w-full max-w-md">
        <img src="/2.png" alt="" className="w-32 md:w-48" />
        <h2 className="mt-6 md:mt-12 text-[#644FC1] text-xl md:text-2xl font-bold">
          Brand or organization
        </h2>
        <p className="text-[#959595] mt-2 md:mt-3 font-light text-sm md:text-base">
          If your branding is established and you're looking for continuous support, get started now.
        </p>

        <div className="mt-8 md:mt-16 w-full flex flex-col items-center">
          <Link href="/branding">
            <a className="py-2 md:py-3 px-10 md:px-16 bg-[#644FC1] text-white rounded-lg font-semibold text-sm md:text-base hover:bg-[#5b46b5] transition-colors w-full md:w-auto text-center">
              Start
            </a>
          </Link>
          <Link href="/login">
            <a className="mt-3 font-semibold text-sm md:text-base text-[#644FC1] hover:underline">
              Learn more
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

