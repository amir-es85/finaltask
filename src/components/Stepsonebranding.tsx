import { useFormContext, Controller } from "react-hook-form";
import { brandingformsvalues, tagoption } from "@/app/(brandingwizardform)/branding/page";
import CreatableSelect from "react-select/creatable";

const defaultTags: tagoption[] = [
  { label: "web design", value: "web design" },
  { label: "software", value: "software" },
  { label: "ui design", value: "ui design" },
  { label: "front end", value: "front end" },
  { label: "backend", value: "backend" },
];

function Stepsonebranding({ nextstep }: { nextstep: () => void }) {
  const { register, control, formState: { isValid ,errors} } = useFormContext<brandingformsvalues>();

  return (
    <div className="container mx-auto px-4 flex flex-col items-start justify-center">
      {/* ---------- این div فقط برای محدود کردن عرض و وسط‌چین کردن لایه در دسکتاپ است ---------- */}
      <div className="w-full md:max-w-[760px] md:mx-auto">
        {/* عنوان و توضیحات — left-aligned (همون‌طوری که خواستی) */}
        <h2 className="text-[#644FC1] text-lg md:text-2xl font-semibold mt-5">
          basic info
        </h2>

        <p className="text-[#959595] mt-3.5 font-light text-sm md:text-base">
          provide an overview of the brand or organization you want to register on 3F
        </p>

        {/* Brand name & Country — stacked در موبایل، کنار هم در دسکتاپ */}
        <div className="flex flex-col mt-4 md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="flex items-center text-sm md:text-base">
              Brand/organization name
              <p className="text-red-700 ml-1.5 font-medium">*</p>
            </label>
            <input
              type="text"
              
              className="border border-[1px] border-[#644FC1] px-2 py-1.5 outline-0 rounded w-full md:py-2 md:text-base"
              {...register("brand_name", { required: "brand_name is required ,",
                minLength:{
                  value:3,
                  message:"Brand name must be at least 3 characters"
                }
               })}
            />
           {errors.brand_name && (
      <p className="text-red-500 text-sm mt-1">{errors.brand_name.message}</p>
    )}
          </div>

          <div className="flex-1 mt-3 md:mt-0">
            <label className="flex items-center text-sm md:text-base">
              Country
              <p className="text-red-700 ml-1.5 font-medium">*</p>
            </label>
            <input
              type="text"
              className="border border-[1px] border-[#644FC1] px-2 py-1.5 outline-0 rounded w-full md:py-2 md:text-base"
              {...register("country", { required: "country is required",
                minLength:{
                  value:3,
                  message:"Country must be at least 3 characters"
                }
               })}
            />
            {errors.country && (
      <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
    )}
          </div>
        </div>

        <p className="text-[#959595] mt-3.5 font-light text-sm md:text-base mb-1">
          select the primary category that best describes your brand or organization, then select the subcategory that further defines it.
        </p>

        {/* Category & Subcategory — همیشه کنار هم؛ در موبایل هم کنار هم با shrink صحیح */}
        <div className="flex gap-3 w-full mt-2">
          <div className="flex-1 min-w-0">
            <label className="flex items-center text-sm md:text-base">
              Category
              <p className="text-red-700 ml-1.5 font-medium">*</p>
            </label>
            <input
              type="text"
              className="border border-[1px] border-[#644FC1] px-2 py-1.5 outline-0 rounded w-full md:py-2 md:text-base"
              {...register("category", { required: "category is required",
                minLength:{
                  value:3,
                  message:"Category must be at least 3 characters"
                }
               })}
            />
            {errors.category &&(<p className="text-red-500 text-sm mt-1">{errors.category.message}</p>)}
          </div>

          <div className="flex-1 min-w-0">
            <label className="flex items-center text-sm md:text-base">
              Sub-Category
              <p className="text-red-700 ml-1.5 font-medium">*</p>
            </label>
            <input
              type="text"
              className="border border-[1px] border-[#644FC1] px-2 py-1.5 outline-0 rounded w-full md:py-2 md:text-base"
              {...register("sub_category", { required: "sub_category is required",
                minLength:{
                  value:3,
                  message:"Sub_Category must be at least 3 characters"
                }
               })}
            />
            {errors.sub_category&&(<p className="text-red-500 text-sm mt-1">{errors.sub_category.message}</p>)}
          </div>
        </div>

        {/* Tags */}
        <label className="mt-4 block text-sm md:text-base">Tags</label>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <CreatableSelect
              isMulti
              options={defaultTags}
              onChange={(val) => field.onChange(val ?? [])}
              value={field.value}
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: "#9CA3AF", // border-gray-400
                  boxShadow: "none",
                  padding: "2px",
                  minHeight: "38px",
                }),
              }}
            />
          )}
        />

        {/* Checkbox (رنگ باکس و تیک مشخص است) */}
        <label className="mt-3 flex items-center gap-2 text-sm md:text-base">
          <input
            className=" w-4 h-4 border accent-[#644FC1] rounded-sm"
            type="checkbox"
            {...register("ischeck", { required: "done" })}
          />
          I agree with the terms of service of 3F
        </label>

        {/* دکمه — موبایل full-width، دسکتاپ اندازه محدود اما LEFT-aligned (نه وسط) */}
        <div className="mt-6">
          <button
            type="button"
            onClick={nextstep}
            disabled={!isValid}
            className="bg-[#644FC1] hover:bg-[#5b46b5] disabled:opacity-50 w-full md:w-40 rounded text-white font-light text-sm md:text-base py-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stepsonebranding;
