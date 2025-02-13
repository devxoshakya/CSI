"use client";
import IdCardScanner from "@/components/shared/OnBoarding/QRCard";
import QrScannerForm from "@/components/shared/OnBoarding/QRScanner";
import { useState } from "react";

export default function QRPage({setData}:any) {
  const [clicked, setClicked] = useState(false);

  // Toggle the clicked state to switch between components

  return (
    <div className="flex flex-col items-center justify-center h-[85vh]">
      {clicked ? (
        <QrScannerForm onDataScanned={setData}/>
      ) : (
        <IdCardScanner setter={setClicked} />
      )}
    </div>
  );
}
