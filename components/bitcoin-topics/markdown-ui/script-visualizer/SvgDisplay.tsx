import React from "react"
import Image from "next/image"

const SvgDisplay = ({
    src,
    alt = "SVG Image",
    width = "100%",
    height = "auto",
    ...props
}: any) => {
    return (
        <div {...props} className="flex items-center justify-center">
            <Image
                src={src}
                alt={alt}
                width={500}
                height={500}
                style={{ width, height }}
            />
        </div>
    )
}

export default SvgDisplay
