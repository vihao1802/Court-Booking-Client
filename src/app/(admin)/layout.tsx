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
      {children}
    </main>
  );
}
