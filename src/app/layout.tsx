import Providers from "./providers";
import { type DehydratedState } from "@tanstack/react-query";
import "~/styles/globals.css";
import Image from "next/image";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "~/components/ui/toaster";

export default function Layout({
  dehydratedState,
  children,
}: {
  dehydratedState: DehydratedState;
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          <nav className="flex w-full items-center justify-center border-b border-white border-opacity-50 bg-gray-800 py-4">
            <div className="flex w-full max-w-screen-xl items-center px-4">
              <Image src="/logo.svg" alt="DFDS logo" width={56} height={18} />
            </div>
          </nav>
          <main className="mx-auto flex w-full max-w-screen-xl items-center justify-center px-2">
            <Providers dehydratedState={dehydratedState}>{children}</Providers>
          </main>
        </NextThemesProvider>
        <Toaster />
      </body>
    </html>
  );
}
