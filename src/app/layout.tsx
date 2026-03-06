import "@/styles/globals.scss";
import type { ReactNode } from "react";

export const metadata = {
  title: "Croatian Wordle",
  description: "Unlimited Croatian Wordle game",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="hr">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}