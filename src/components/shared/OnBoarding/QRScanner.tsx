"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ScannedData {
  branch: string;
  name: string;
  fname: string;
  phone: string;
}

export default function QrScannerForm({ onDataScanned }: any) {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [rollNo, setRollNo] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrReader, setQrReader] = useState<Html5Qrcode | null>(null);
  const qrReaderElementRef = useRef<HTMLDivElement>(null);
  const isScannerInitialized = useRef(false); // Track whether scanner is initialized

  useEffect(() => {
    if (isScannerInitialized.current) return; // Prevent reinitializing

    startScanner();
    isScannerInitialized.current = true; // Mark scanner as initialized

    return () => {
      if (qrReader) {
        qrReader.stop();
      }
    };
  }, []);

  const startScanner = async () => {
    setError(null);
    console.log("Attempting to access the camera...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      console.log("Camera stream started successfully:", stream);

      const qrReaderElement = qrReaderElementRef.current;
      if (qrReaderElement) {
        const newQrReader = new Html5Qrcode("qr-reader");
        await newQrReader.start(
          { facingMode: "environment" },
          {
            qrbox: { width: 250, height: 250 }, // Custom size for the QR scanning box
            fps: 10,
          },
          onScanSuccess,
          onScanFailure
        );
        setQrReader(newQrReader);
        setIsScanning(true);
        console.log("QR reader started successfully.");
      } else {
        throw new Error("QR reader element not found");
      }
    } catch (err: any) {
      console.error("Error starting QR scanner:", err);
      if (err.name === "NotReadableError") {
        setError("Camera is already in use by another application.");
      } else if (err.name === "NotAllowedError") {
        setError("Camera access was denied. Please grant permissions.");
      } else if (err.name === "OverconstrainedError") {
        setError("No suitable camera found for the desired constraints.");
      } else {
        setError(
          "Failed to access camera. Please ensure it's connected and permissions are granted."
        );
      }
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (qrReader) {
      await qrReader.stop();
      setQrReader(null);
      setIsScanning(false);
    }
  };

  const onScanSuccess = (decodedText: string) => {
    try {
      const [branch, name, fname, phone] = decodedText.split(" - ");
      setScannedData({ branch, name, fname, phone });
      stopScanner();
      onDataScanned(decodedText); // Pass data to the parent
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      setError("Invalid QR code format. Please try again.");
    }
  };

  const onScanFailure = (error: string) => {
    console.log("QR code scan failed:", error);
  };

  return (
    <div className="container mx-auto p-4 items-center justify-center">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="relative w-full max-w-xs mx-auto mb-4 items-center justify-center">
        <span className="text-xs mx-auto items-center justify-center text-red-500 font-semibold">
          * Place the QR on your college ID card in the center
        </span>
        <div
          id="qr-reader"
          ref={qrReaderElementRef}
          className="relative w-full h-auto rounded-sm border-1 border-black bg-black"
        >
          {/* The box for QR code scan */}
          <div className="absolute border-2 border-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
