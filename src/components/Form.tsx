import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl,FormMessage} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/lib/supabaseClinet";
import { useData } from "@/hooks/Datacontext";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export type FormValues = {
  Name: string;
  description: string;
  Amont: string;
};
const yupschima=yup.object().shape({
    Name:yup.string().min(3).required(),
    description:yup.string().min(5).required(),
    Amont:yup.string().required()

})

export function SimpleForm() {
      const {branddid}=useData()
  const form = useForm<FormValues>({
    resolver:yupResolver(yupschima),
    mode: "onChange",         // ✅ ولیدیشن لحظه‌ای
  reValidateMode: "onChange",
    defaultValues: {
      Name: "",
      description: "",
      Amont: "",
    },
  });

  const onSubmit = async(data: FormValues) => {
  
  const {error}=await supabase.from("contribuot").insert([{
    brand_id:branddid,
    name:data.Name,
    deckription:data.description,
    amont:data.Amont
  }])
  if(error){
    toast.error(error.message)
    console.error(error);
    
  }
  else{toast.success("Your contribution was created successfully")}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-2xl shadow-xl  p-10">
        <h1 className="text-[#644FC1] text-center font-bold text-xl">Tier type</h1>
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="border border-[#644FC1] border-2"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward descriptio</FormLabel>
              <FormControl>
                <Input {...field} className="border border-[#644FC1] border-2"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Amont"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amont</FormLabel>
              <FormControl>
                <Input {...field} className="border border-[#644FC1] border-2"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid||form.formState.isSubmitting} className="w-full bg-[#644FC1] mt-1 disabled:opacity-50">
          Submit
        </Button>
      </form>
    </Form>
  );
}
