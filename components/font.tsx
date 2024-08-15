import {
    Barlow,
    Bricolage_Grotesque,
    Inter,
    Space_Grotesk
} from "next/font/google"

export const barlow = Barlow({
    weight: ["100", "300", "400", "500", "600", "700"],
    variable: "--barlow-font",
    preload: true,
    display: "swap",
    subsets: ["latin"]
})

export const bricolage = Bricolage_Grotesque({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    variable: "--bricolage-font",
    preload: true,
    display: "swap",
    subsets: ["latin"]
})

const space_grotesk = Space_Grotesk({
    weight: ["300", "400", "500", "600", "700"],
    preload: true,
    subsets: ["latin"],
    display: "swap",
    variable: "--font-space-grotesk"
})

const inter = Inter({ subsets: ["latin"] })

export default function Fonts() {
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
          :root {
            --barlow-font: ${space_grotesk.style.fontFamily};
          }`
            }}
        ></style>
    )
}
