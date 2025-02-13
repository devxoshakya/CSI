import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IdCardScanner({ setter }: any) {
  const handleClick = () => {
    setter(true); // This will set clicked to true when the card is clicked
  };

  return (
    <div className="items-center justify-center flex flex-col space-y-4">
      {/* <h1 className="text-xl font-semibold inset-0">
      
      </h1> */}
      <p className="text-sm text-primary/60 px-6">
      To get started, Click the button below to scan your ID card
      </p>

      <div className="inline-flex -space-x-px divide-x divide-primary-foreground/30 rounded-lg shadow-sm scale-125 shadow-black/5 rtl:space-x-reverse min-w-32">
        <Button
          className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 "
          size="icon"
          aria-label="QR code"
          onClick={handleClick}
        >
          <QrCode size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
        <Button
          onClick={handleClick}
          className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        >
          Scan ID
        </Button>
      </div>
    </div>
  );
}
