
import "../globals.css";
import LeftSideBar from "@/components/shared/LeftSideBar";
import AuthProvider from "@/components/common/auth";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row">
      <LeftSideBar />
      <div className="h-screen w-[calc(100%-250px)] ml-auto flex flex-row justify-center">
        <AuthProvider>{children}</AuthProvider>
      </div>
    </main>
  );
}
