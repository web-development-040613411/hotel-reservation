import ImagePlaceholder from "@/assets/image-square-placeholder.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employeeRole } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateAccountEmployeeSchema = z
  .object({
    username: z
      .string({ message: "username is required" })
      .min(1, "Name is required"),
    first_name: z
      .string({ message: "firstname is required" })
      .min(1, "firstname is required"),
    last_name: z
      .string({ message: "lastname is required" })
      .min(1, "lastname is required"),
    date_of_birth: z
      .string({ message: "date of birth is required" })
      .min(1, "date of birth is required"),
    password: z
      .string({ message: "password is required" })
      .min(6, "Password is required"),
    confirm_password: z
      .string({ message: "confirm password is required" })
      .min(6, "Confirm password is required"),
    role: z.enum(employeeRole),
    image: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password and confirm password doesn't match",
  });

export default function CreateAccountModal() {
  const form = useForm({
    resolver: zodResolver(CreateAccountEmployeeSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      password: "",
      confirm_password: "",
      role: "frontdesk",
      image: undefined,
    },
  });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCreateAccount = async () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    formData.append("role", form.getValues("role"));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/employees`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      router.refresh();
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
        <DialogTrigger asChild>
          <Button>Create Account</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>
              Create a new account for the employee.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(() => handleCreateAccount())}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <Label>{`Employee's Picture`}</Label>
                  <Image
                    src={previewImage || ImagePlaceholder}
                    alt="Room type image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full max-h-80 h-full"
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormControl>
                          <Button type="button" className="relative">
                            Choose file
                            <Input
                              {...fieldProps}
                              type="file"
                              accept="image/*"
                              className="opacity-0 absolute hover:cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  onChange(file);
                                  setPreviewImage(URL.createObjectURL(file));
                                }
                              }}
                            />
                          </Button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Username</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Password</Label>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Confirm Password</Label>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <Label>First Name</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Last Name</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Date of Birth</Label>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Role</Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue {...field} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employeeRole.map((role, idx) => (
                              <SelectItem value={role} key={idx}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Create Account
                  </Button>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
