import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dravyaguna World",
  description: "A plant-first learning and reference platform for BAMS Dravyaguna study."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
