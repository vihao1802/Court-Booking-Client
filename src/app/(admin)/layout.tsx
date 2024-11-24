
import "../globals.css";
import LeftSideBar from "@/components/shared/LeftSideBar";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row">
      <LeftSideBar />
      <div className="h-screen w-[calc(100%-250px)] ml-auto flex flex-row justify-center">
        {children}
      </div>
    </main>
  );
}
