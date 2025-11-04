import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import Createteammembermodal from "../modal/Createteammembermodal";
import { useEffect, useState } from "react";
import { useData } from "@/hooks/Datacontext";
import { supabase } from "@/lib/supabaseClinet";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Editteammembermodal from './../modal/Editteammembermodal';
export type teammember = {
  id: number;
  name: string;
  emailadres: string;
  image_url: string;
  role: string;
  description: string;
  brand_id: string;
};

export default function Teammember() {
  const [teammember, setteammember] = useState<teammember[]>([]);
  const { branddid } = useData();

  const fechdata = async () => {
    const { data, error } = await supabase
      .from("teammember")
      .select("*")
      .eq("brand_id", branddid);
    if (error) {
      toast.error(error.message);
      return;
    }
    setteammember(data);
  };

  useEffect(() => {
    fechdata();
  }, [branddid]);

  return (
    <div>
      <h1 className="text-[#444444] md:text-2xl text-lg font-semibold mb-5 md:mb-5">
        Team
      </h1>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-4 md:gap-7">
        {teammember.map((c) => (
          <div
            key={c.id}
            className="relative bg-white border border-[#C7C6C6] rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
          >
            {/* آیکون ویرایش */}
            <Dialog>
              <DialogTrigger className="sm:block hidden absolute top-3 right-3 text-gray-500 hover:text-[#644FC1] py-1 bg-[#F5F5F5] px-2 rounded">
                <FiEdit2 size={18} />
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl sm:block hidden"><Editteammembermodal id={c.id} /></DialogContent>
            </Dialog>
            <Drawer>
              <DrawerTrigger className="sm:hidden block absolute top-3 right-3 text-gray-500 hover:text-[#644FC1] py-1 bg-[#F5F5F5] px-2 rounded"><FiEdit2 size={18} /></DrawerTrigger>
              <DrawerContent><Editteammembermodal id={c.id} /></DrawerContent>
            </Drawer>

            {/* تصویر پروفایل */}
            <div className="flex relative items-center justify-center w-[100px] h-[100px] rounded-full   mb-4 overflow-hidden">
              {c.image_url ? (
                <img
                  src={c.image_url}
                  alt={c.name}
                  className="w-full absolute inset-0 h-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-[#B9A8FF] text-[80px]" />
              )}
            </div>

            {/* نام */}
            <h2 className="text-[#444444] font-semibold text-lg mb-2">
              {c.name}
            </h2>

            {/* نقش */}
            <div className="bg-[#F0EFEF] text-[#666666] text-sm px-4 py-1 rounded-full mb-3">
              {c.role || "Member"}
            </div>

            {/* توضیحات */}
            <p className="text-gray-500 text-sm leading-relaxed mb-1 px-2">
              {c.description
                ? c.description
                : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
            </p>


          </div>
        ))}
      </div>

      {/* دکمه افزودن */}
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger className="w-16 h-16 flex items-center justify-center text-white text-3xl rounded-xl bg-[#644FC1] shadow-md hover:bg-[#533BB0] transition-colors mt-5">
            +
          </DialogTrigger>
          <DialogContent>
            <Createteammembermodal fechdata={fechdata} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
