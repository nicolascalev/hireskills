import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@/app/ui/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import MainNav from "@/app/ui/structure/MainNav";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hireskills",
  description: "Find developer based on their skills",
};

const theme = createTheme({
  primaryColor: "indigo",
});

export function generateViewport(): Viewport {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");

  if (userAgent) {
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    if (isIOS) {
      return {
        maximumScale: 1,
      };
    }
  }

  return {};
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignUpUrl="/register">
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body className={inter.className}>
          <MantineProvider theme={theme}>
            <AppShell header={{ height: 60 }}>
              <AppShellHeader>
                <MainNav />
              </AppShellHeader>
              <AppShellMain>{children}</AppShellMain>
            </AppShell>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
