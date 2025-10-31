'use client'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { SimpleForm } from "../Form";
import { useData } from "@/hooks/Datacontext";
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabaseClinet";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { div } from "framer-motion/client";
import Editcontribuote from './../modal/Editcontribuote';
type Contribute = {
    id: number;
    name: string;
    deckription: string;
    amont: string;
    brand_id: string;
    created_at: string;
};


function Contribuot() {
    const { branddid } = useData()
    const [openmodal , setopenmodal]=useState<boolean>(false)
    const [contributions, setContributions] = useState<Contribute[]>([]);
   const fechdata = async () => {
        const { data, error } = await supabase.from("contribuot").select("*").eq("brand_id", branddid).order("created_at", { ascending: false })
        if (error) {
            toast.error(error.message)
            console.error(error.message);

        }
        else setContributions(data || []);
    }
    useEffect(() => {
        if (branddid) fechdata()
    }, [branddid])

  
useEffect(()=>{
    if(!branddid)return
    const chanel =supabase.channel("realtimecontribuotall").on("postgres_changes",
      {
        event:"*",
        schema: "public",
        table: "contribuot",
        filter: `brand_id=eq.${branddid}`
      },
      (payload)=>{
       if (payload.eventType === "DELETE" && payload.old.brand_id === branddid) {
      setContributions(prev => prev.filter(c => c.id !== payload.old.id));
    } else if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
      fechdata();
    }
      }
    ).subscribe();
    return ()=>{supabase.removeChannel(chanel).then(()=>{
      console.log("f"); 
    })}

  },[branddid])

  const handleItemDeleted = (id: number) => {
  setContributions(prev => prev.filter(c => c.id !== id));
};


    return (
        <div className="md:ml-20 md:mr-20 ml-1 mr-1">
            <h2 className="text-[#444444] md:text-2xl text-lg font-semibold mb-2 md:mb-4">Coontribution Tier</h2>
            <h3 className="text-[#444444] md:text-xl text-base font-medium ml-3 md:mb-11 mb-6">Recurring or One time</h3>
            <div className="grid gap-13 grid-cols-1 md:grid-cols-4 md:gap-7">
                {contributions.map((c) => (
                    <div key={c.id} className="shadow-md hover:shadow-xl transition rounded pb-5">
                        <h2 className="text-white bg-[#644FC1] text-base text-center pt-2 pb-2 rounded-t">{c.name}</h2>
                        <div className="flex flex-col  pr-6 pl-6">
                            <h1 className="text-center  text-[#444444] font-medium text-lg mt-5 mb-5.5 ">You are one the list</h1>
                            <p className="text-left mb-7  text-[#444444] font-semibold text-lg">start to <span className="text-[#644FC1]">{c.amont}</span></p>
                            <p className="line-clamp-5 break-words text-sm text-gray-400 text-left mb-5 w-full max-w-full">{c.deckription}</p>
                            <Dialog open={openmodal} onOpenChange={setopenmodal}>
                                <DialogTrigger className="w-full bg-[#644FC1] rounded text-white py-1.5 ">Edit Tier</DialogTrigger>
                                <DialogContent className="sm:max-w-3xl"><Editcontribuote id={c.id} setopenmodal={setopenmodal}  handleItemDeleted={handleItemDeleted}/></DialogContent>
                            </Dialog>

                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center">
                <Dialog>
                    <DialogTrigger className="w-16 h-16 flex items-center justify-center text-white text-3xl rounded-xl bg-[#644FC1] shadow-md hover:bg-[#533BB0] transition-colors mt-5">
                        +
                    </DialogTrigger>
                    <DialogContent>
                        <SimpleForm />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Contribuot