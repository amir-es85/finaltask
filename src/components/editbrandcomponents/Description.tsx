import { useData } from "@/hooks/Datacontext"
import { supabase } from "@/lib/supabaseClinet"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import Editdescriptionmodal from "../modal/Editdescriptionmodal"

interface dec {
    description: string
}
function Description() {
    const { branddid } = useData()
    const [description, setdescription] = useState<dec | null>(null)
    const [open, setopen] = useState<boolean>(false)
    const fechdata = async () => {
        const { data, error } = await supabase.from("branding").select("*").eq("id", branddid)

        if (data) {
            setdescription(data[0])
        }
    }
    useEffect(() => {
        fechdata()
    }, [branddid])


    return (
        <div>
            <div className="flex items-center justify-start gap-3 mb-4">
                <h2 className="text-[#444444] md:text-2xl text-lg font-semibold m-0 leading-none">About</h2>
                <Dialog open={open} onOpenChange={setopen}>
                    <DialogTrigger className="px-3 py-1 rounded bg-[#EDE9FE] border border-[#AA99EC] text-[#644FC1] font-medium text-sm md:text-base hover:bg-[#DDD6FE] transition leading-none">
                        Edit
                    </DialogTrigger>
                    <DialogContent>
                        <Editdescriptionmodal fechdata={fechdata} setopen={setopen} />
                    </DialogContent>
                </Dialog>
            </div>
            <p className="text-gray-700 md:text-lg text-base font-normal ml-1 break-words break-all whitespace-normal w-full">{description?.description}</p>
        </div>
    )
}

export default Description
