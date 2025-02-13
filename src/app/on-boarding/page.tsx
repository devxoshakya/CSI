"use client";
import { SignupFormDemo } from "@/components/shared/OnBoarding/DetailsPage";
import QRPage from "@/components/shared/OnBoarding/QRPage";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>(null);

  // Toggle the clicked state to switch between components
  // const data = "CSE-PAGA-HEMANT-9876543210";
  return (
    <div className="m-auto mx-auto my-auto">
      {data ? <SignupFormDemo data={data} /> : <QRPage setData={setData} />}
      {/* <SignupFormDemo data={data} /> */}
    </div>
  );
}
