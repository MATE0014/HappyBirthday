import { Pacifico, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto-condensed",
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
