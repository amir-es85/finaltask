
import Link from 'next/link';

export default function Home() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center container px-4 md:px-0">
      {/* Header */}
      <h2 className="text-[#644FC1] text-lg md:text-2xl font-extrabold text-center">
        Create your profile and take the firest step to wards new opportunitis
      </h2>
      <p className="text-[#717171] text-sm mt-3 font-medium text-center max-w-md md:max-w-full">
        By creating yuor account you agin access to a thriving community where brands and invalid are commited to ofering you ongoing suport.this supoort network is resurse
      </p>

      {/* Card */}
      <div className="flex flex-col items-center justify-center text-center mt-20 border border-2 pt-6 md:pt-15 md:px-10 px-5 pb-6 rounded border-[#644FC1] w-full max-w-md">
        <img src="/2.png" alt="" className="w-32 md:w-auto" />
        <h2 className="mt-16 text-[#644FC1] text-xl font-bold">
          Brand or organization
        </h2>
        <p className="text-[#959595] mt-2 font-light text-sm">
          if your branding is establish and youre looking for continuous support,get started now
        </p>

        <div className="mt-16 flex flex-col items-center w-full">
          <Link
            href="/branding"
            className="py-2 px-10 md:px-30 bg-[#644FC1] text-white rounded font-semibold text-sm hover:bg-[#5b46b5] w-full md:w-auto text-center"
          >
            Start
          </Link>
          <Link
            href="/login"
            className="mt-3 font-semibold text-sm text-[#644FC1] hover:underline"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

