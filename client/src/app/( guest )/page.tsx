import Image from "next/image"
import FormBooking from "./components/form-booking"

export default function Page() {
  

  return (
    <>
      <div id="page1" className="w-100dvh h-100dvh">
        <Image
          src="/room.jpg"
          width={500}
          height={500}
          alt="image"
          />
        <div className="md:w-96 w-3/4
                        absolute 
                        top-1/2 -translate-y-1/2
                        left-1/2 -translate-x-1/2">
          <FormBooking />
        </div>
      </div>
    </>
  )
}