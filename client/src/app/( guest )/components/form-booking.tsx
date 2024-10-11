"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

export default function FormBooking() {
  const [ peopleAmount, setPeopleAmount ] = useState<number>(1);
  const [ dateRange, setDateRange ] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(e: any) {
    e.preventDefault();
    console.log(dateRange);
  }

  function displayCheckInCheckOut() {
    if ( dateRange.from && dateRange.to === undefined) {
      return `${format(dateRange.from, "PPP") } / Check out`
    } else if ( dateRange.from && dateRange.to ) { 
      return `${format(dateRange.from, "PPP") } / ${format(dateRange.to, "PPP") }`;
    }

    return "Check in / Check out";
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          `w-full pl-3 
                          md:h-20 md:text-lg
                          text-left font-normal`,
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        { displayCheckInCheckOut() }
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" side="top">
                    <Calendar
                      className=""
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange as SelectRangeEventHandler}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex">
                  <Button className="md:h-20 w-20 md:text-3xl shrink-0 bg-gray-400"
                          onClick={() => {
                            setPeopleAmount(peopleAmount + 1)
                          }}> + </Button>
                  <Input type="number" placeholder="Amount of people" 
                        className="m-0 md:h-20 md:text-xl text-center"
                        value={peopleAmount}/>
                  <Button className="md:h-20 w-20 md:text-3xl shrink-0 bg-gray-400"
                          onClick={() => {
                            if ( peopleAmount > 1 ) 
                              setPeopleAmount(peopleAmount - 1)
                          }}> - </Button>
                </div>
              </FormItem>
            )}
          />
          <FormItem>
            <Button className="w-full
                               md:h-20 md:text-xl bg-white text-black hover:text-white" type="submit">Booking</Button>
          </FormItem>
        </form>
      </Form>
    </>
  )
}
