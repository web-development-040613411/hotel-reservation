import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  formInputs,
  specialRequest,
} from "@/app/( guest )/model/customer-information";
import { ReservationContext } from "@/context/ReservationContext";
import { useContext, useEffect, useState } from "react";

class InvalidPatternInfo {
  errorMessage = "";
  isInvalidPattern = true;

  setIsInvalidPattern(status: boolean) {
    this.isInvalidPattern = status;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}

export default function PersonalInformationForm() {
  const { addInformation, information, setState, state } =
    useContext(ReservationContext);
  const { personalInformation } = information;
  const [isChange, setIsChange] = useState(false);
  const [invalidPatternInfos, setInvalidPatternInfos] = useState<
    InvalidPatternInfo[]
  >(
    Array.from(
      { length: formInputs.length + 1 },
      () => new InvalidPatternInfo()
    )
  );
  const [canPass, setCanPass] = useState(true);

  const btnClass = `bg-primary w-full rounded-lg  hover:bg-gray-800 active:bg-gray-800
                    p-4 my-4 hover:bg-primary-hover 
                    font-bold text-white`;

  const onSubmitHandler = (e: any) => {
    e.preventDefault();

    if (!canPass) {
      return;
    }

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

  const checkPattern = (
    pattern: string,
    value: string,
    errorMessage: string,
    index: number
  ) => {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      const newInvalidPatternInfos = [...invalidPatternInfos];

      newInvalidPatternInfos[index].setIsInvalidPattern(true);
      newInvalidPatternInfos[index].setErrorMessage(errorMessage);

      setInvalidPatternInfos(newInvalidPatternInfos);
    } else {
      const newInvalidPatternInfos = [...invalidPatternInfos];

      newInvalidPatternInfos[index].setIsInvalidPattern(false);

      setInvalidPatternInfos(newInvalidPatternInfos);
    }
  };

  const checkSpecialRequest = (value: string, pattern: string, errorMessage : string) => {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      setCanPass(false);
      const newInvalidPatternInfos = [...invalidPatternInfos];

      newInvalidPatternInfos[9].setIsInvalidPattern(true);
      newInvalidPatternInfos[9].setErrorMessage(errorMessage);

      setInvalidPatternInfos(newInvalidPatternInfos);
    } else {
      setCanPass(true);
    }
  }

  return (
    <form
      className="my-4 flex flex-col
                 md:flex-row md:w-full md:gap-10"
      onSubmit={(e) => onSubmitHandler(e)}
    >
      <div className="md:w-1/2 flex flex-col gap-2 ">
        {formInputs.slice(0, 6).map((input, index) => (
          <div key={index}>
            <div className="flex items-center justify-between px-2">
              <Label htmlFor={input.id}>
                {input.label} <span className="text-red-500"> *</span>
              </Label>

              {invalidPatternInfos[index].isInvalidPattern && (
                <h1 className="text-red-500 text-xs font-bold">
                  {invalidPatternInfos[index].errorMessage}
                </h1>
              )}
            </div>
            <Input
              type={input.type}
              id={input.id}
              placeholder={input.placeHolder}
              name={input.name}
              className="my-2"
              required={input.required}
              onChange={(e) => {
                setIsChange(true);
                checkPattern(
                  input.pattern!,
                  e.target.value,
                  input.errorMessage!,
                  index
                );
              }}
              defaultValue={
                personalInformation ? personalInformation[input.key] : ""
              }
              maxLength={input.max}
              pattern={input.pattern}
            />
          </div>
        ))}
      </div>

      <div className="md:w-1/2 flex-grow flex flex-col gap-2">
        {formInputs.slice(6).map((input, index) => {
          const shiftedIndex = index + 6;
          return (
            <div key={shiftedIndex}>
              <div className="flex items-center justify-between px-2">
                <Label htmlFor={input.id}>
                  {input.label} <span className="text-red-500"> *</span>
                </Label>

                {invalidPatternInfos[shiftedIndex].isInvalidPattern && (
                  <h1 className="text-red-500 text-xs font-bold">
                    {invalidPatternInfos[shiftedIndex].errorMessage}
                  </h1>
                )}
              </div>
              <Input
                type={input.type}
                id={input.id}
                placeholder={input.placeHolder}
                name={input.name}
                className="my-2"
                required={input.required}
                onChange={(e) => {
                  setIsChange(true);
                  checkPattern(
                    input.pattern!,
                    e.target.value,
                    input.errorMessage!,
                    shiftedIndex
                  );
                }}
                defaultValue={
                  personalInformation ? personalInformation[input.key] : ""
                }
                maxLength={input.max}
              />
            </div>
          );
        })}
        <div className="md:flex-grow md:flex md:flex-col md:my-2 md:gap-2">
          <div className="flex items-center justify-between px-2">
            <Label htmlFor="email">Special Requests</Label>
            {invalidPatternInfos[9].isInvalidPattern && (
              <h1 className="text-red-500 text-xs font-bold">
                {invalidPatternInfos[9].errorMessage}
              </h1>
            )}
          </div>
          <Textarea
            placeholder="Type your message here."
            className="md:flex-grow"
            onChange={(e) => {
              setIsChange(true);
              checkSpecialRequest(
                e.target.value,
                specialRequest.pattern,
                specialRequest.errorMessage
              );
            }}
            defaultValue={
              personalInformation ? personalInformation.specialRequests : ""
            }
          />
        </div>

        <Button
          className={btnClass}
          type="submit"
          disabled={!isChange }
        >
          {state == 4 ? "Confirm Edit" : "Confirm"}
        </Button>
      </div>
    </form>
  );
}
