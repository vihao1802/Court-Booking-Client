"use client";
import OvalLoader from "@/components/shared/OvalLoader";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, firstLoading } = useAuthenticatedUser();

  useEffect(() => {
    if (!firstLoading && user) {
      if (user.role.roleName === "ADMIN") router.push("/dashboard");
      router.push("/");
    }
  }, [user, firstLoading]);

  if (firstLoading || user) {
    return (
      <div className="h-[100vh]">
        <OvalLoader size="50" />
      </div>
    );
  }

  return <main>{children}</main>;
}
