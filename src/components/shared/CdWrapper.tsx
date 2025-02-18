"use client";

import dynamic from "next/dynamic";

const CdBack = dynamic(() => import("./CDback"), { ssr: false });

export default function CdBackWrapper() {
  return <CdBack />;
}
