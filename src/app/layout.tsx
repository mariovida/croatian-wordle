import "@/styles/globals.scss";
import type { ReactNode } from "react";

const DOMAIN = "";

export const metadata = {
  title: "Wordle HR - Hrvatska verzija Wordlea",
  description:
    "Igrajte Wordle HR, hrvatsku verziju popularne igre pogađanja riječi. Besplatno, neograničeno i svakodnevno nova riječ!",
  keywords: [
    "Wordle",
    "Wordle hrvatski",
    "Hrvatska",
    "igra riječi",
    "pogađanje riječi",
    "besplatna igra",
    "logička igra",
    "Hrvatski jezik",
  ],
  author: "Wordle HR",
  openGraph: {
    title: "Wordle HR - Hrvatska verzija Wordlea",
    description:
      "Igrajte Wordle HR, hrvatsku verziju popularne igre pogađanja riječi. Besplatno i neograničeno!",
    url: DOMAIN,
    siteName: "Wordle HR",
    type: "website",
    images: [
      {
        url: `${DOMAIN}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Wordle HR",
      },
    ],
  },
};

export const viewport = "width=device-width, initial-scale=1.0";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('theme');
                  if (saved) {
                    document.documentElement.setAttribute('data-theme', saved);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
