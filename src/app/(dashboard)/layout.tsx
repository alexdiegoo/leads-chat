import type { Metadata } from "next";
import SideNav from "../ui/SideNav";
import Header from "../ui/Header";

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex bg-background text-text min-h-screen font-sans">
        <SideNav />

        <div className="flex-1 flex flex-col ml-68">
            <Header />
            <main className="flex-1 mt-20 p-6 flex justify-center">
            <div className="w-full max-w-5xl rounded-2xl p-6">
                {children}
            </div>
            </main>
        </div>
    </div>
  );
}
