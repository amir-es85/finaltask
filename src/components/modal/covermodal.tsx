'use client'

import { useData } from '@/hooks/Datacontext'
import { supabase } from '@/lib/supabaseClinet'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'


export type image = {
  id: string
  name: string
  description: string
  category: string
  subcategory: string
  tags: string
  countries: string
  coverurl: string
  userid: string
  created_at: string
  profileurl:string
}
export type imageuplode = {
  cover: FileList
}

function Covermodal({ brandid }: { brandid: string | string[] | undefined|null }) {
 const {image , setimage}=useData()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    const fechdata = async () => {
      const { data: imagedata, error } = await supabase
        .from('branding')
        .select('*')
        .eq('id', brandid)
      if (error) {
        console.error(error)
      }
      if (imagedata && imagedata.length > 0) {
        setimage(imagedata[0])
        console.log(imagedata[0])
      }
    }
    fechdata()
  }, [brandid])

  const { register, handleSubmit, watch ,formState:{isSubmitting},reset} = useForm<imageuplode>()
  const selectedFile = watch('cover') // 👈 اضافه شد

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      const file = selectedFile[0]
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [selectedFile]) // 👈 اضافه شد

  const onsubmit = async (formdata: imageuplode) => {
    if (!formdata.cover || formdata.cover.length === 0) {
      toast.error('No file selected')
      return
    }
    const cover = formdata.cover[0]
    const safefile = cover.name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_.-]/g, '')
    const filepath = `berands/${brandid}/${Date.now()}_${safefile}`
    const { data: storegupload, error: storageeror } = await supabase.storage
      .from('coverbrand')
      .upload(filepath, cover, { upsert: true })
    if (storageeror || !storegupload) {
      toast.error(storageeror.message)
      return
    }
    const { data: publicurldata } = supabase.storage
      .from('coverbrand')
      .getPublicUrl(storegupload.path)
    if (!publicurldata) {
      toast.error('nooo')
    }
    const publicurl = publicurldata.publicUrl
    if (!publicurl) {
      toast.error('nooot')
    }
    const { error: uplodtableeror } = await supabase
      .from('branding')
      .update({
        coverurl: publicurl,
      })
      .eq('id', brandid)
    if (uplodtableeror) {
      toast.error(uplodtableeror.message)
    } else {
      toast.success('Upload & update successful')
      reset()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Add cover image
        </h2>

        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4 border border-dashed border-gray-300">
          {previewUrl || image?.coverurl ? (
            <img
              src={previewUrl || image?.coverurl}
              alt="cover preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-gray-400">No image selected</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col gap-3 text-sm"
        >
          <input
            type="file"
            accept="image/*"
            {...register('cover')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="text-purple-600 hover:underline"
              onClick={() => setPreviewUrl(null)}
            >
              Upload new image
            </button>
            <div className="flex gap-2">
              <button
                type="reset"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={!previewUrl || previewUrl === image?.coverurl||isSubmitting}
                className={`px-4 py-2 rounded-full transition bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Covermodal
