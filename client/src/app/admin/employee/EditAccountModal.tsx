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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
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
import { Employee, employeeRole } from "@/lib/type";
import { formatDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditAccountEmployeeSchema = z
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
    phone_number: z.string().min(1, "phone number is required"),
    date_of_birth: z
      .string()
      .date("date of birth is required")
      .min(1, "date of birth is required"),
    role: z.enum(employeeRole),
    image: z.instanceof(File, { message: "Image is required" }).optional(),
  });

interface EditAccountModalprops {
  employee: Employee;
}

export default function EditAccountModal({ employee }: EditAccountModalprops) {
  const form = useForm({
    resolver: zodResolver(EditAccountEmployeeSchema),
    defaultValues: {
      username: employee.username,
      first_name: employee.first_name,
      last_name: employee.last_name,
      phone_number: employee.phone_number,
      date_of_birth: formatDate(employee.date_of_birth),
      role: employee.role,
      image: undefined,
    },
  });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${employee.profile_picture}`
  );

  const handleCreateAccount = async () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    formData.append("role", form.getValues("role"));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/employees/${employee.id}`,
      {
        method: "PUT",
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
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Edit the account for the employee.
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
                    src={employee.profile_picture ? previewImage : ImagePlaceholder}
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
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Phone number</Label>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                    Edit
                  </Button>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
