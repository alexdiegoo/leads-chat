import type { Metadata } from "next";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Theme>
          <div className="flex bg-background text-text min-h-screen font-sans">
            {children}
          </div>
        </Theme>
      </body>
  </html>
  );
}
