import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Automated Educational Video Generator",
  description: "Transform your educational content into engaging videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>{/* Add your header component here */}</header>
        <main>{children}</main>
        <footer>{/* Add your footer component here */}</footer>
      </body>
    </html>
  );
}
