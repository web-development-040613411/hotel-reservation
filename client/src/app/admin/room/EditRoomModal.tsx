import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const AddRoomSchema = z.object({
  number: z.string(),
  type_id: z.string(),
});

interface EditRoomModalProps {
  roomId: string;
  roomNumber: string;
  roomTypeName: string;
}

export default function EditRoomModal({ roomId, roomNumber, roomTypeName }: EditRoomModalProps) {
  const form = useForm({
    resolver: zodResolver(AddRoomSchema),
    defaultValues: {
      number: roomNumber,
      type_id: "",
    },
  });

  const [roomType, setRoomType] = useState<{ id: string; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleEditRoom = async (values: z.infer<typeof AddRoomSchema>) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms/${roomId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      router.refresh();
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    async function fetchTypeRoom() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/room-types`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.status === "success") {
        setRoomType(data.data);
        form.setValue("type_id", data.data.find((type: { id: string, name: string }) => type.name === roomTypeName).id);
      }
    }

    fetchTypeRoom();
  }, []);

  return (
    <>
      <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="w-full max-w-xs">
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogDescription>Edit this room</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => handleEditRoom(values))}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Number</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-wrap break-all">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomType.length > 0 &&
                            roomType.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Edit
                </Button>
              </form>
            </Form>
            <Button className="w-full mt-2" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
