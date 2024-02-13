import "@mantine/core/styles.css";
import { AppShell, AppShellHeader, AppShellMain, ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import MainNav from "@/app/ui/structure/MainNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hireskills",
  description: "Find developer based on their skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <AppShell header={{ height: 60 }}>
            <AppShellHeader>
              <MainNav />
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
