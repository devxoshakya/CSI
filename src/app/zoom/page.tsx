"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScannedData {
  branch: string;
  name: string;
  fname: string;
  phone: string;
}

export default function QrScannerForm({ onDataScanned }: any) {
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qrReader, setQrReader] = useState<Html5Qrcode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [maxZoom, setMaxZoom] = useState<number>(1);
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack | null>(null); // Store the track
  const qrReaderElementRef = useRef<HTMLDivElement>(null);
  const isScannerInitialized = useRef(false);

  useEffect(() => {
    if (isScannerInitialized.current) return;
    startScanner();
    isScannerInitialized.current = true;

    return () => {
      if (qrReader) qrReader.stop();
    };
  }, []);

  const startScanner = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      const track = stream.getVideoTracks()[0];
      setVideoTrack(track); // Store the track in state
      const capabilities = track.getCapabilities();

      if (capabilities.zoom) {
        setMaxZoom((capabilities as any).zoom.max);
      }

      const qrReaderElement = qrReaderElementRef.current;
      if (qrReaderElement) {
        const newQrReader = new Html5Qrcode("qr-reader");
        await newQrReader.start(
          { facingMode: "environment" },
          {
            qrbox: { width: 250, height: 250 },
            fps: 10,
          },
          onScanSuccess,
          onScanFailure
        );
        setQrReader(newQrReader);
      } else {
        throw new Error("QR reader element not found");
      }
    } catch (err: any) {
      console.error("Error starting QR scanner:", err);
      setError(
        err.name === "NotAllowedError"
          ? "Camera access denied. Please grant permissions."
          : "Failed to access the camera. Ensure it's connected and permissions are granted."
      );
    }
  };

  const adjustZoom = async (newZoom: number) => {
    console.log("Adjusting Zoom to:", newZoom);
    if (!qrReader) {
      console.warn("QR Reader not initialized");
      return;
    }
    setZoomLevel(newZoom);
  
    try {
      const videoTrack = qrReader.getRunningTrackCapabilities() as any;
      if (videoTrack && videoTrack.applyConstraints) {
        await videoTrack.applyConstraints({
          advanced: [{ zoom: newZoom }],
        });
        console.log("Zoom adjusted successfully");
      } else {
        console.warn("Zoom adjustment not supported on this device");
      }
    } catch (error) {
      console.error("Failed to set zoom:", error);
    }
  };

  const onScanSuccess = (decodedText: string) => {
    try {
      const [branch, name, fname, phone] = decodedText.split(" - ");
      setScannedData({ branch, name, fname, phone });
      onDataScanned(decodedText);
      qrReader?.stop();
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
        <span className="text-xs mx-auto text-red-500 font-semibold">
          * Place the QR on your college ID card in the center
        </span>
        <div
          id="qr-reader"
          ref={qrReaderElementRef}
          className="relative w-full h-auto rounded-sm border-1 border-black bg-black"
        >
          <div className="absolute border-2 border-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] pointer-events-none" />
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={() => adjustZoom(Math.max(zoomLevel - 1, 1))}
          disabled={zoomLevel <= 1}
          variant="outline"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm font-semibold">{zoomLevel.toFixed(1)}x</span>
        <Button
          onClick={() => adjustZoom(Math.min(zoomLevel + 1, maxZoom))}
          disabled={zoomLevel >= maxZoom}
          variant="outline"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
