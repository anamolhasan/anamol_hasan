"use client";
import { useState } from "react";
import { useFirstVisit } from "./useFirstVisit";
import IntroLoader from "./IntroLoader";
import RouteLoader from "./RouteLoader";
import RefreshLoader from "./RefreshLoader";

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const { isFirstVisit, checked } = useFirstVisit();
  const [introDone, setIntroDone] = useState(false);

  // hydration check শেষ না হওয়া পর্যন্ত কিছুই ঠিক করে বলা যাবে না
  if (!checked) {
    return <>{children}</>;
  }

  const showIntro = isFirstVisit && !introDone;

  // প্রথমবার visit -> শুধু IntroLoader দেখাবে, বাকি সব loader mount-ই হবে না
  if (showIntro) {
    return (
      <>
        <IntroLoader onFinish={() => setIntroDone(true)} />
        {children}
      </>
    );
  }

  // Intro শেষ (অথবা প্রথমবার visit না) -> এখন RouteLoader/RefreshLoader active
  return (
    <>
      <RefreshLoader />
      <RouteLoader />
      {children}
    </>
  );
}