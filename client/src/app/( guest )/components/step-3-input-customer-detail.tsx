'use client';

import {
  Card
} from "@/components/ui/card";

import ConclusionBar from "./conclusion-bar";
import PersonalInformationForm from "./personal-information-form";
import StepHeader from "./header";

export default function Step3() {
  const title = "Personal Information";
  const step = 3;

  return (
    <>
      <ConclusionBar/>
      
      <div className="flex justify-center mt-5 mb-5">
        <Card className="w-11/12 shadow-md border-primary shadow-primary m-0 p-8">
          <StepHeader title={title} step={step}/>

          <PersonalInformationForm/>
        </Card>
      </div>

      <div className="h-28">
      
      </div>
    </>
  );
}