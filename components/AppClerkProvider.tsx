"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type AppClerkProviderProps = {
  children: React.ReactNode;
};

export default function AppClerkProvider({ children }: AppClerkProviderProps) {
  const router = useRouter();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      routerPush={(to: string | URL) => {
        const destination = typeof to === "string" ? to : to.toString();
        router.push(destination);
      }}
      routerReplace={(to: string | URL) => {
        const destination = typeof to === "string" ? to : to.toString();
        router.replace(destination);
      }}
    >
      {children}
    </ClerkProvider>
  );
}
