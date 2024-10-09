"use client";

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

const AddRoomSchema = z.object({
  number: z.string(),
  type_id: z.string(),
});

export default function AddRoomModal() {
  const form = useForm({
    resolver: zodResolver(AddRoomSchema),
    defaultValues: {
      number: "",
      type_id: "",
    },
  });

  const [roomType, setRoomType] = useState<{ id: string; name: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleAddRoom = async (values: z.infer<typeof AddRoomSchema>) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/rooms`,
      {
        method: "POST",
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
      form.setValue("number", "");
      form.setValue("type_id", "");
      setIsOpen(false);
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
      }
    }

    fetchTypeRoom();
  }, []);

  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button>Add Room</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-xs">
          <DialogHeader>
            <DialogTitle>Add Room</DialogTitle>
            <DialogDescription>Add a new room</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => handleAddRoom(values))}
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
                          <SelectTrigger>
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
                  Add room
                </Button>
              </form>
            </Form>
            <Button className="w-full mt-2" variant="outline">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
