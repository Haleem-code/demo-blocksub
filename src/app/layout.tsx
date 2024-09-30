import type { Metadata } from "next";
import { Poppins} from '@next/font/google';
import "./globals.css";
const poppins = Poppins({
  subsets: ['latin'], 
  weight: ['400', '700'], 
});


export const metadata: Metadata = {
  title: "DEMO",
  description:
    "DEMO FOR BLOCKSUB RADAR HACKATHON",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">
      <head>
    
      </head>
      <body className={`${poppins.className}`}>
   
        {children}
        
      </body>
    </html>

  );
}
