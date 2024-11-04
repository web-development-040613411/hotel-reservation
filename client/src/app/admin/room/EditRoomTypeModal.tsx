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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RoomType } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddRoomTypeSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  capacity: z.coerce.number(),
  detail: z.string(),
  image: z.instanceof(File).optional(),
});

interface EditRoomTypeModalProps {
  roomType: RoomType;
}

export default function EditRoomTypeModal({ roomType }: EditRoomTypeModalProps) {
  const form = useForm({
    resolver: zodResolver(AddRoomTypeSchema),
    defaultValues: {
      name: roomType.name,
      price: roomType.price,
      capacity: roomType.capacity,
      detail: roomType.detail,
      image: undefined,
    },
  });
  const [previewImage, setPreviewImage] = useState<string | null>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${roomType.picture_path}`);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleEditRoomType = async () => {
    if (!formRef.current) return;

    const form = new FormData(formRef.current);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/room-types/${roomType.id}`,
      {
        method: "PUT",
        credentials: "include",
        body: form,
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
        <DialogContent className="w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Room Type</DialogTitle>
            <DialogDescription>Edit {roomType.name}</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(() => handleEditRoomType())}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <Label>{`Room's Picture`}</Label>
                  <Image
                    src={previewImage || ImagePlaceholder}
                    alt="Room type image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full aspect-video"
                    priority
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
                              className="opacity-0 absolute cursor-pointer"
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Type Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Type name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate / Night</FormLabel>
                        <FormControl>
                          <Input placeholder="Price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="Capacity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="detail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Detail" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsModalOpen(false)}
                  >
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