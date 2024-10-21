import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formInputs } from "@/app/( guest )/customer-information-model";
import { ReservationContext } from "@/components/context/ReservationContext";
import { useContext, useState } from "react";

export default function PersonalInformationForm() {
  const { addInformation, information, setState, state } =
    useContext(ReservationContext);
  const { personalInformation } = information;
  const [isChange, setIsChange] = useState(false);

  const onSubmitHandler = (e: any) => {
    e.preventDefault();

    const personalInformation = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      address: e.target[2].value,
      province: e.target[3].value,
      district: e.target[4].value,
      subDistrict: e.target[5].value,
      postcode: e.target[6].value,
      phoneNumber: e.target[7].value,
      email: e.target[8].value,
      specialRequests: e.target[9].value
    };

    addInformation({ personalInformation });

    setIsChange(false);

    if ( state != 4 ) {
      setState(4);
    }  
  };

  return (
    <form
      action=""
      className="my-4 flex flex-col gap-4"
      onSubmit={(e) => onSubmitHandler(e)}
    >
      {formInputs.map((input, index) => (
        <div key={index} className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor={input.id}>
            {input.label} <span className="text-red-500"> *</span>
          </Label>
          <Input
            type={input.type}
            id={input.id}
            placeholder=""
            name={input.name}
            className="my-2"
            required={input.required}
            onChange={() => setIsChange(true)}
            defaultValue={personalInformation ? personalInformation[input.key] : ""}
          />
        </div>
      ))}

      <div>
        <Label htmlFor="email">Special Requests</Label>
        <Textarea
          placeholder="Type your message here."
          className="my-2"
          onChange={() => setIsChange(true)}
          defaultValue={personalInformation ? personalInformation.specialRequests : ""}
        />
      </div>

      {
        state == 4 ?
        <Button
        className=" bg-primary w-full rounded-lg  hover:bg-gray-800 active:bg-gray-800
        p-4 hover:bg-primary-hover 
        font-bold text-white"
        type="submit"
        disabled={!isChange}
        >
        Confirm Edit
      </Button>
      :
      <Button
        className=" bg-primary w-full rounded-lg  hover:bg-gray-800 active:bg-gray-800
        p-4 hover:bg-primary-hover 
        font-bold text-white"
        type="submit"
        >
        Confirm
      </Button>
      }
    </form>
  );
}
