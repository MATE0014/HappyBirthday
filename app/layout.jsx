import { Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

export const metadata = {
  title: "Happy Birthday!",
  description: "Wishing You A Very Happy Birthday",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={pacifico.variable}
      >
        {children}
      </body>
    </html>
  );
}
