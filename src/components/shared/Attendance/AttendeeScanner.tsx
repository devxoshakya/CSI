"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Card } from "@/components/ui/card";


interface ScannedData {
  branch: string;
  name: string;
  fname: string;
  phone: string;
}

interface QrScannerFormProps {
  eventId: string;
}

export default function AttendeeScanner({ eventId }: QrScannerFormProps) {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrReader, setQrReader] = useState<Html5Qrcode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "fail" | "not-found" | null>(null);
  const qrReaderElementRef = useRef<HTMLDivElement>(null);
  const isScannerInitialized = useRef(false); // Track scanner initialization

  useEffect(() => {
    if (isScannerInitialized.current) return;
    startScanner();
    isScannerInitialized.current = true;

    return () => {
      qrReader?.stop();
    };
  }, []);

  const startScanner = async () => {
    setError(null);
    try {
      const qrReaderElement = qrReaderElementRef.current;
      if (!qrReaderElement) throw new Error("QR reader element not found");

      const newQrReader = new Html5Qrcode("qr-reader");

      await newQrReader.start(
        { facingMode: "environment" },
        { qrbox: { width: 250, height: 250 }, fps: 10 },
        onScanSuccess,
        onScanFailure
      );

      setQrReader(newQrReader);
      setIsScanning(true);
    } catch (err: any) {
      setError("Failed to access the camera. Ensure permissions are granted.");
      console.error(err);
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

  const onScanSuccess = async (decodedText: string) => {
    try {
      console.log("Scanned QR Code:", decodedText);

      const parts = decodedText.split("-");
      if (parts.length !== 4) {
        setError("Invalid QR code format. Please try again.");
        return;
      }

      const [branch, name, fname, phone] = parts;
      const userData = { branch, name, fname, phone };
      console.log("Extracted Data:", userData);
      setScannedData(userData);
      stopScanner();

      // Check if user is registered
      const res = await axios.post("/api/check-in", { phone, eventId });

      if (res.status === 200) {
        setModalType("success");
      } else if (res.status === 402) {
        setModalType("fail");
      }

      setShowModal(true);
    } catch (error: any) {
      if (error.response?.status === 402) {
        setModalType("fail");
        setShowModal(true);
      } else if (error.response?.status === 404) {
        setModalType("not-found");
        setShowModal(true);
      }else {
        setError("An error occurred while processing the QR code.");
        console.error("Error during API request:", error);
      }
    }
  };

  const onScanFailure = (error: string) => {
    // console.warn("QR scan failed:", error);

    if (error.includes("NotFoundException")) {
      //   setError("No QR code detected. Please ensure the code is visible.");
    }
  };

  const admitUser = async () => {
    if (!scannedData) return;
    try {
      await axios.put("/api/check-in", { phone: scannedData.phone, eventId });
      setModalType("success");
    } catch (error) {
      setError("Failed to register the user.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 h-full flex items-start justify-center flex-col">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-[350px] p-6 bg-neutral-100 rounded-xl border border-gray-300">
        <div className="text-center mb-4">
          <span className="text-sm text-red-400 font-semibold">
            * Place the QR on your college ID card in the center
          </span>
        </div>
        <div className="relative w-full h-auto rounded-md border border-gray-700 bg-black">
          <div
            id="qr-reader"
            ref={qrReaderElementRef}
            className="relative w-full h-full rounded-md"
          >
            <div className="absolute border-4 border-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] pointer-events-none rounded-md" />
          </div>
        </div>
      </Card>

      {/* Modal for success or failure */}
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-[350px] rounded-md">
        <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {modalType === "success" ? (
            <>
            <CheckCircle className="h-6 w-6 text-green-500" />
            Check-in Successful
            </>
          ) : modalType === "fail" ? (
            <>
            <XCircle className="h-6 w-6 text-red-500" />
            User Not Registered
            </>
          ) : (
            <>
            <XCircle className="h-6 w-6 text-red-500" />
            User Not Found
            </>
          )}
        </DialogTitle>
        </DialogHeader>

        {modalType === "fail" && (
        <p className="text-center text-gray-600">
          Would you like to admit the user?
        </p>
        )}

        {modalType === "not-found" && (
          <p className="text-center text-gray-600">User not found.</p>
        )}

        <DialogFooter>
          {modalType === "fail" ? (
            <div className="flex gap-4 items-center justify-center">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={admitUser} className="bg-blue-600 text-white">
                Admit User
              </Button>
            </div>
          ) : modalType === "success" ? (
            <Button
              onClick={() => setShowModal(false)}
              className="bg-green-600 text-white"
            >
              OK
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  );
}
