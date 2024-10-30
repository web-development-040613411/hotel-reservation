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
  const btnClass = `bg-primary w-full rounded-lg  hover:bg-gray-800 active:bg-gray-800
                    p-4 my-4 hover:bg-primary-hover 
                    font-bold text-white`

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
      specialRequests: e.target[9].value,
    };

    addInformation({ personalInformation });

    setIsChange(false);

    if (state != 4) {
      setState(4);
    }
  };

  return (
    <form
      className="my-4 flex flex-col
                 md:flex-row md:w-full md:gap-10"
      onSubmit={(e) => onSubmitHandler(e)}
    >
      <div className="md:w-1/2 md:flex md:flex-col md:gap-2">
        {formInputs.slice(0, 6).map((input, index) => (
          <div key={index}>
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
              defaultValue={
                personalInformation ? personalInformation[input.key] : ""
              }
            />
          </div>
        ))}
      </div>

      <div className="md:w-1/2 md:flex-grow md:flex md:flex-col md:gap-2">
        {formInputs.slice(6).map((input, index) => (
          <div key={index}>
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
              defaultValue={
                personalInformation ? personalInformation[input.key] : ""
              }
            />
          </div>
        ))}
        <div className="md:flex-grow md:flex md:flex-col md:my-2 md:gap-2">
          <Label htmlFor="email">Special Requests</Label>
          <Textarea
            placeholder="Type your message here."
            className="md:flex-grow"
            onChange={() => setIsChange(true)}
            defaultValue={
              personalInformation ? personalInformation.specialRequests : ""
            }
          />
        </div>

        {state == 4 ? (
          <Button
            className={btnClass}
            type="submit"
            disabled={!isChange}
          >
            Confirm Edit
          </Button>
        ) : (
          <Button
            className={btnClass}
            type="submit"
          >
            Confirm
          </Button>
        )}
      </div>
    </form>
  );
}
