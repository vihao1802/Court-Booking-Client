"use client";
import OvalLoader from "@/components/shared/OvalLoader";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, firstLoading } = useAuthenticatedUser();

  useEffect(() => {
    if (!firstLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, firstLoading]);

  if (firstLoading || !user) {
    return <OvalLoader size="50" />;
  }

  return <main>{children}</main>;
}
