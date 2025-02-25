"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { useRouter, usePathname } from "next/navigation";
import FeedBack from "./Feedback";

const FeedBacsk = ({ onClose }: { onClose: () => void }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    console.log("Feedback submitted:", feedback);
    localStorage.removeItem("attendance");
    onClose();
  };

  return (
    <Dialog open>
      <DialogHeader>
        <DialogTitle>Attendance Marked</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <AlertCircle className="h-8 w-8 text-green-500" />
          <AlertTitle className="text-green-500">
            Attendance marked successfully
          </AlertTitle>
        </div>
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </DialogContent>
      <DialogFooter>
        <Button onClick={handleSubmit}>Submit Feedback</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default function AttendanceScanner() {
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrReader, setQrReader] = useState<Html5Qrcode | null>(null);
  const [showFeedback, setShowFeedback] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("attendance") || "[]");
    const today = new Date().toISOString().split("T")[0];
    return storedData.includes(today);
  });
  const qrReaderElementRef = useRef<HTMLDivElement>(null);
  const isScannerInitialized = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (showFeedback || isScannerInitialized.current) return;

    startScanner();
    isScannerInitialized.current = true;

    return () => {
      stopScanner();
    };
  }, [showFeedback]);

  const pathname = usePathname();
  
  useEffect(() => {
    stopScanner();
  }, [pathname]);

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
        () => {}
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
      const url = new URL(decodedText);
      const eventSecret = url.searchParams.get("eventSecret");
      if (!eventSecret) {
        setError("Invalid QR code. No event secret found.");
        return;
      }

      const storedData = JSON.parse(localStorage.getItem("attendance") || "[]");
      const today = new Date().toISOString().split("T")[0];
      if (storedData.includes(today)) {
        setError("Attendance already marked for today.");
        return;
      }

      const res = await axios.post("/api/attendance", { eventSecret });

      if (res.status === 200) {
        storedData.push(today);
        localStorage.setItem(
          "attendance",
          JSON.stringify(storedData.slice(-7))
        );
        setShowFeedback(true);
        stopScanner();
      } else {
        setError("Failed to mark attendance. Please try again.");
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setError("User is not registered for this event.");
      } else {
        setError("An error occurred while processing the QR code.");
      }
      console.error("Error during API request:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 h-full flex items-center justify-center">
      {showFeedback ? (
        <FeedBack/>
      ) : (
        <>
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
                * Scan the QR code displayed on the projector screen
              </span>
            </div>
            <div className="relative w-full h-auto rounded-md border border-gray-700 bg-black">
              <div
                id="qr-reader"
                ref={qrReaderElementRef}
                className="relative w-full h-full rounded-md"
              />
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
