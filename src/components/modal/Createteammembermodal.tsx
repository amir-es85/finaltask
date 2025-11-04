import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { supabase } from "@/lib/supabaseClinet";
import { useData } from "@/hooks/Datacontext";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
type createteammember = {
    name: string,
    role: string,
    discribtion?: string,
    imageurl?: FileList,
    emailadres: string
}

const schima=yup.object().shape({
    name:yup.string().min(3).required(),
    role:yup.string().required(),
    discribtion:yup.string().optional(),
    imageurl:yup.mixed<FileList>().optional(),
    emailadres:yup.string().email("Invalid email address").required("Email is required")
}) as yup.ObjectSchema<createteammember>

export type TeamMemberInsert = {
    name: string;
    role: string;
    emailadres: string;
    brand_id: string;
    description?: string;
    image_url?: string;
}
function Createteammembermodal({fechdata}:{fechdata:()=>void}) {
    const {branddid}=useData()
    const form = useForm<createteammember>({resolver:yupResolver(schima),
        mode:"onChange"})
    const onsubmit=async(data:createteammember)=>{
        try {
            const { imageurl, ...formData } = data;
            
            const hasImage = imageurl && imageurl.length > 0;
            
            let imagePath: string | undefined = undefined;
            
            if (hasImage && imageurl && imageurl[0]) {
                const file = imageurl[0];
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `team-members/${fileName}`;
                
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('team member')
                    .upload(filePath, file);
                
                if (uploadError) {
                    toast.error(`Failed to upload image: ${uploadError.message}`);
                    return;
                }
                
                const { data: urlData } = supabase.storage
                    .from('team member')
                    .getPublicUrl(filePath);
                
                imagePath = urlData.publicUrl;
            }
            
            if (!branddid || (Array.isArray(branddid) && branddid.length === 0)) {
                toast.error('Brand ID is required');
                return;
            }
            
            const brandIdValue: string | null | undefined = Array.isArray(branddid) ? branddid[0] : branddid;
            
            if (!brandIdValue || typeof brandIdValue !== 'string') {
                toast.error('Invalid brand ID');
                return;
            }
            
            const brandId = brandIdValue as string;
            
            const insertData: TeamMemberInsert = {
                name: formData.name,
                role: formData.role,
                emailadres: formData.emailadres,
                brand_id: brandId,
                ...(formData.discribtion && formData.discribtion.trim() && { description: formData.discribtion }),
                ...(imagePath && { image_url: imagePath })
            };
            
            const { data: insertedData, error: insertError } = await supabase
                .from('teammember')
                .insert([insertData])
                .select();
            
            if (insertError) {
                toast.error(`Failed to save data: ${insertError.message}`);
                return;
            }
            
            toast.success('Team member added successfully');
            form.reset();
            fechdata()
           
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error submitting form');
        }
    }
    return (
        <Form {...form}>
            <form className="flex flex-col gap-3  md:px-4" onSubmit={form.handleSubmit(onsubmit)}>
                <h1 className="text-[#644FC1] text-center font-bold text-xl">Invite team member</h1>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="border border-[1.5px] border-[#8D75F7]"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="border border-[1.5px] border-[#8D75F7] w-full">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="User">User</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    
                    <FormField
          control={form.control}
          name="imageurl"
          render={({ field: { onChange, onBlur, name, value, ref, ...field } }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files || undefined)}
                  onBlur={onBlur}
                  name={name}
                  ref={ref}
                  className="w-full border border-[#8D75F7] border-[1.5px] cursor-pointer text-gray-600  transition"
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
                    control={form.control}
                    name="discribtion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Discription</FormLabel>
                            <FormControl>
                               <textarea {...field} className="border border-[1.5px] border-[#8D75F7] rounded-md p-2 resize-none h-20"></textarea>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField
                    control={form.control}
                    name="emailadres"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} className="border border-[1.5px] border-[#8D75F7] h-9 w-full rounded-md border-[1.5px] border-[#8D75F7] bg-transparent px-3 py-1 text-base outline-none transition-all duration-150"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    
<div className="flex items-center justify-start gap-5 mt-7 ">
          <button
            type="button"
            
            className="px-2 py-1.5 rounded-md bg-[#EDE9FE] border  hover:opacity-50 border-[#AA99EC] text-[#644FC1] font-medium hover:bg-[#DDD6FE] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-1.5 rounded-md bg-[#644FC1] text-white font-medium hover:shadow-md transition hover:opacity-50"
          >
            Save
          </button>
        </div>
            </form>
        </Form>

    )
}

export default Createteammembermodal