
import  Link  from 'next/link';
export default function Home() {
  return (
   <div className="mt-4 flex items-center justify-center flex-col container">
    <h2 className=" text-[#644FC1] text-lg md:text-2xl font-extrabold">Create your profile and take the firest step to wards new opportunitis</h2>
    <p className="text-[#717171] text-sm  md:text-sm mt-3 font-medium">By creating yuor account you agin access to a thriving community where brands and invalid are commited to ofering you ongoing suport.this supoort network is resurse</p>
    <div className="flex flex-col items-center justify-center text-center mt-20 border border-2 pt-15 md:px10 px-5 pb-6 rounded border-[#644fc1]" >
<img src="/2.png" alt="" />
<h2 className="mt-16 text-[#644FC1] text-xl font-bold">Brand or organization</h2>
<p className="text-[#959595] mt-2 font-light text-sm">if your branding is establish and youre looking for continuous support,get started now</p>
<div className="mt-16">
  <p className='py-2 bg-[#644fc1] px-30 text-white rounded font-semibold text-sm hover:bg-[#5b46b5] cursor-pointer'><Link href="/branding" >Start</Link></p>
  <p className="mt-3 font-semibold text-sm text-[#644fc1]"><Link href="/login">learn more</Link></p>
</div>
    </div>
   </div>
      
  );
}
