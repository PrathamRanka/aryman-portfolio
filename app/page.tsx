"use client"
import PreLoading from "@/components/Pre-Loading"
import LandingPage from "./pages/LandingPage";
import { useState } from "react";
import WhoAmIPage from "./pages/whoAmI";
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <PreLoading onFinished={() => setIsLoading(false)} />;
  }

  return (
    <>
      <LandingPage />
      <WhoAmIPage />
    </>
  );
}
