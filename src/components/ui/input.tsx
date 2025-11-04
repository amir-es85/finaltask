import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 🟣 حالت عادی
        "h-9 w-full rounded-md border-[1.5px] border-[#8D75F7] bg-transparent px-3 py-1 text-base outline-none transition-all duration-150",
        // 🟣 حذف ring و رنگ خاکستری فوکوس
        "focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none",
        // 🟣 تغییر ضخامت و رنگ در حالت فوکوس
        "focus:border-3 focus:border-[#8D75F7]",
        // 🔴 حالت خطا - وقتی aria-invalid="true" است
        "aria-invalid:border-red-500 aria-invalid:focus:border-red-500",
        // 🟣 بقیه استایل‌های پایه (برای سازگاری با shadcn)
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-w-0 shadow-xs file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
