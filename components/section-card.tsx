import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import Button from "./button"
import { slugify } from "@/utils/slugify"

type Props = React.ComponentProps<typeof Link> & {
    alt: string
    description: string
    btnText: string
    className?: string
    src: string
    title: string
}

export default function SectionCard({
    alt,
    btnText,
    description,
    className,
    src,
    title,
    ...rest
}: Props) {
    return (
        <div
            className={clsx(
                `flex flex-col bg-orange-100 dark:bg-orange-900 rounded-xl shadow-normal hover:shadow-raised transition-[box-shadow] duration-500 ease-in-out overflow-hidden`,
                className
            )}
        >
            <div className={`relative h-[250px] w-full max-md:h-[150px]`}>
                <Image
                    className="object-cover"
                    src={src}
                    alt={alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-6 max-md:p-3 flex flex-col items-center gap-y-4 max-md:gap-y-2 text-center">
                <h2 className="text-[38px] max-md:text-xl font-semibold leading-[100%]">
                    {title}
                </h2>
                <p className="text-xl max-md:text-sm">{description}</p>
                <Button
                    className="w-[55%]"
                    {...rest}
                    data-umami-event={`landing-page-${slugify(btnText)}-btn-clicked`}
                >
                    {btnText}
                </Button>
            </div>
        </div>
    )
}
