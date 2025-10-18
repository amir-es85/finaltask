import { brandingformsvalues } from '@/app/(brandingwizardform)/branding/page'
import React from 'react'
import { useFormContext } from 'react-hook-form'

function Stepstwobranding({ prevstap }: { prevstap: () => void }) {
  const { register, watch, formState: { isValid, errors, isSubmitting } } = useFormContext<brandingformsvalues>()

  const platforms = watch("platform")
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
      new URL(value);
      return true;
    } catch {
      return "فرمت URL معتبر نیست";
    }
  };

  return (
    <div className='
      container mx-auto px-4 flex flex-col items-start justify-center
      md:items-center md:justify-start md:max-w-[900px] md:mt-10
    '>
      <p className='text-[#644FC1] text-lg md:text-2xl font-semibold mt-5 md:self-start'>
        Detailed info
      </p>
      <p className='mt-3 text-[#505050] font-medium text-lg mb-7 md:text-xl md:self-start'>
        what is the primry mission or objective of your brand/origanition?
      </p>
      
      <textarea
        placeholder='Short Summary'
        className='
          border border-1.5 border-[#644FC1] rounded-2xl h-125 block w-full mx-auto resize-none
          placeholder:text-center outline-0 placeholder:text-gray-600 placeholder:text-2xl placeholder:font-semibold placeholder:flex placeholder:items-center placeholder:justify-center placeholder:pt-3
          md:h-48 md:placeholder:text-left md:placeholder:text-xl md:p-4
        '
        {...register("discription", { required: "discription is required" })}
      ></textarea>

      <p className='mt-15 text-[#505050] font-medium text-lg mb-6 mx-auto md:text-left md:mt-10'>
        Helps your contributors find you faster (at least 3 option)
      </p>

      <div className='flex flex-col gap-6 items-center justify-center mx-auto w-full md:gap-4'>
        {platforms.map((_, i) => (
          <div key={i} className='flex flex-col gap-2 items-center justify-center mx-auto w-full md:flex-row md:gap-3'>
            <select
              className='
                border border-1.5 py-2 rounded outline-0 border-[#644FC1] w-full text-[#717171]
                md:w-1/3
              '
              {...register(`platform.${i}.label`)}
            >
              <option value="" key=""></option>
              {platformoption.map(p => (
                <option className='text-gray-600 font-medium pb-0.5 hover:bg-blue-300' value={p} key={p}>
                  {p}
                </option>
              ))}
            </select>
            <input
              className='
                border border-1.5 outline-0 w-full rounded py-2 border-[#644FC1]
                md:w-2/3
              '
              {...register(`platform.${i}.url`, { validate: validateURL })}
              placeholder="https://example.com"
            />
          </div>
        ))}
      </div>

      <button
        type='submit'
        disabled={!isValid || isSubmitting}
        className='
          disabled:opacity-50 mt-7 hover:bg-[#5b46b5] font-light text-sm bg-[#644FC1] rounded text-white w-full py-1.5
          md:w-1/3 md:mx-auto md:block
        '
      >
        Continue
      </button>
    </div>
  )
}

export default Stepstwobranding