import { Barlow, Inter, Space_Grotesk } from "next/font/google";

export const barlow = Barlow({
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--barlow-font",
  preload: true,
  display: "swap",
  subsets: ["latin"],
});


export const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})


const inter = Inter({ subsets: ["latin"] });

export default function Fonts() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --barlow-font: ${barlow.style.fontFamily};
            --inter-font: ${inter.style.fontFamily};
          }`,
      }}
    ></style>
  );
}
