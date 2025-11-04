'use client'

import { useData } from '@/hooks/Datacontext'
import { supabase } from '@/lib/supabaseClinet'
import { img } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

type profile = {
    profile: FileList
}
function Profilemodal({ brandid , fechdata}: { brandid: string | string[] | undefined |null,fechdata:()=>void}) {
    const { image, setimage } = useData()
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const { register, handleSubmit, watch, formState: { isSubmitting }, reset } = useForm<profile>()
    const selectedfile = watch("profile")
    useEffect(() => {
        if (selectedfile && selectedfile.length > 0) {
            const file = selectedfile[0]
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [selectedfile])
    const onsubmit = async (formdata: profile) => {
        if (!formdata.profile || formdata.profile.length === 0) {
            toast.error("No file selected")
            return
        }
        const profile = formdata.profile[0]
        const safefile = profile.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_.-]/g, '')
        const filepath = `brands/${brandid}/${Date.now()}_${safefile}`
        const { data: storegdata, error: storegeror } = await supabase.storage.from("profileurl").upload(filepath, profile, { upsert: true })
        if (storegeror || !storegdata) {
            toast.error(storegeror.message)
            return
        }
        const { data: urldata } = supabase.storage.from("profileurl").getPublicUrl(storegdata.path)
        if (!urldata) {
            toast.error("noo")
            return
        }
        const publicurl = urldata.publicUrl
        if (!publicurl) {
            toast.error("noot")
            return
        }
        const { data: tabeldata, error: tabeleror } = await supabase.from("branding").update({
            profileurl: publicurl
        }).eq("id", brandid)
        if (tabeleror) {
            toast.error(tabeleror.message)
        }
        else {
            toast.success("Upload & update successful")
            fechdata()
            reset()
        }

    }
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50'>
            <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative'>
                <h2 className='text-lg font-semibold text-gray-700 mb-4 text-center'>
                    Add profile image
                </h2>
                <div className='w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4 border border-dashed border-gray-300 object-cover'>
                    {previewUrl || image?.profileurl ? (
                        <img src={previewUrl || image?.profileurl} />) : (
                        <p>no image selected</p>
                    )}
                </div>
                <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-3 text-sm">
                    <input type="file" accept='image/*' {...register("profile")}
                        className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200'/>
                    <div className='flex justify-between mt-4'>
                        <button
                            type="button"
                            className="text-purple-600 hover:underline"
                            onClick={() => setPreviewUrl(null)}>
                            Upload new image
                        </button>
                        <div className='flex gap-2'>
                            <button
                                type="reset"
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                            >
                                Reset
                            </button>
                            <button
                                type='submit'
                                disabled={!previewUrl || previewUrl === image?.profileurl || isSubmitting}
                                className={`px-4 py-2 rounded-full transition bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500`}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profilemodal