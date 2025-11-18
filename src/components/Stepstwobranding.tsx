import { brandingformsvalues } from '@/app/(brandingwizardform)/branding/page'
import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

function Stepstwobranding({ prevstap }: { prevstap: () => void }) {
  const { register, control, formState: { isValid, errors, isSubmitting } } =
    useFormContext<brandingformsvalues>()

  const { fields, remove, append } = useFieldArray({
    control,
    name: "platform"
  })

  const platformoption = [
    "instagram",
    "telegram",
    "youtube",
    "linkedin",
    "website",
    "tiktok"
  ]

  const validateURL = (value: string | undefined) => {
    if (!value) return true
    try {
      new URL(value)
      return true
    } catch {
      return "Please enter a valid URL"
    }
  }

  return (
    <div className='
      container mx-auto px-4 flex flex-col items-start justify-center
      md:items-center md:justify-start md:max-w-[900px]
    '>
      <p className='text-[#644FC1] text-lg md:text-2xl font-semibold mt-5 md:self-start'>
        Detailed info
      </p>
      <p className='mt-3 text-[#505050] font-medium text-lg mb-7 md:text-xl md:self-start'>
        What is the primary mission or objective of your brand/organization?
      </p>

      {/* توضیحات برند */}
      <textarea
        placeholder='Short Summary'
        className='
          border border-[#644FC1] rounded-2xl h-32 block w-full mx-auto resize-none
          placeholder:text-gray-600 placeholder:text-lg md:p-4 outline-none
        '
        {...register("discription", { required: "Description is required" })}
      />

      <p className='mt-10 text-[#505050] font-medium text-lg mb-6'>
        Helps your contributors find you faster (add your social links)
      </p>

      {/* باکس‌های شبکه اجتماعی */}
      <div className='flex flex-col gap-5 w-full'>
        {fields.map((field, i) => (
          <div
            key={field.id}
            className='flex flex-col md:flex-row items-center gap-3 relative'
          >
            <select
              className='
                border border-[#644FC1] rounded py-2 px-2 w-full md:w-1/3 text-[#717171]
              '
              {...register(`platform.${i}.label` as const)}
            >
              <option value="">Select platform</option>
              {platformoption.map(p => (
                <option value={p} key={p}>{p}</option>
              ))}
            </select>

            <div className='w-full md:w-2/3 flex flex-col'>
              <input
                placeholder='https://example.com'
                className='border border-[#644FC1] rounded py-2 px-2 w-full outline-none'
                {...register(`platform.${i}.url` as const, { validate: validateURL })}
              />
              {errors.platform?.[i]?.url && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.platform[i].url?.message as string}
                </p>
              )}
            </div>

            {/* دکمه حذف */}
            <button
              type="button"
              onClick={() => remove(i)}
              
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* دکمه افزودن پلتفرم جدید */}
      <button
        type="button"
        onClick={() => append({ label: "", url: "" })}
        className='
          mt-6 flex items-center justify-center gap-2 border border-[#717171]
          text-[#717171] bg-[#F5F5F5] rounded-lg py-2 px-4  transition w-full md:w-1/5
        '
      >
        <span className="text-xl font-bold">+</span>
        <span>Add social link</span>
      </button>

      {/* دکمه ادامه */}
      <button
        type='submit'
        disabled={!isValid || isSubmitting}
        className='
          disabled:opacity-50 mt-9 mb-3.5 hover:bg-[#5b46b5] font-light text-sm
          bg-[#644FC1] rounded text-white w-full py-1.5
          md:w-1/3 md:mx-auto md:block
        '
      >
        Continue
      </button>
    </div>
  )
}

export default Stepstwobranding
