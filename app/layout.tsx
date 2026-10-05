import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Fuselage Innovations | Intelligence, Airborne",
  description:
    "Mission-ready UAV, IoT and AI systems for agriculture, industry and pilot development.",
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      style={
        {
          "--hero-image": `url(${basePath}/assets/flight-world.webp)`,
        } as CSSProperties
      }
    >
      <head>
        <style>{`
          @font-face{font-family:Manrope;src:url('${basePath}/fonts/manrope-400.ttf') format('truetype');font-style:normal;font-weight:400;font-display:swap}
          @font-face{font-family:Manrope;src:url('${basePath}/fonts/manrope-600.ttf') format('truetype');font-style:normal;font-weight:600 800;font-display:swap}
          @font-face{font-family:Barlow;src:url('${basePath}/fonts/barlow-condensed-600.ttf') format('truetype');font-style:normal;font-weight:400 800;font-display:swap}
        `}</style>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
