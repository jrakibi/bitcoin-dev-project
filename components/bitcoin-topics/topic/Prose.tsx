import clsx from "clsx"

export function Prose<T extends React.ElementType = "div">({
    as,
    className,
    ...props
}: React.ComponentPropsWithoutRef<T> & {
    as?: T
}) {
    let Component = as ?? "div"

    return (
        <Component
            className={clsx(
                className,
                "prose prose-gray max-w-3xl mx-auto dark:prose-invert dark:text-gray-300 text-lg",
                // headings
                "prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-medium lg:prose-headings:scroll-mt-[8.5rem]",
                // lead
                "prose-lead:text-gray-500 dark:prose-lead:text-gray-300",
                // links
                "prose-a:font-semibold dark:prose-a:text-orange-300",
                // link underline
                // "prose-a:no-underline prose-a:shadow-[inset_0_-3px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,1px)+3px))_0_0_var(--tw-prose-underline,theme(colors.orange.300))] hover:prose-a:[--tw-prose-underline-size:2px] dark:[--tw-prose-background:theme(colors.gray.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,1px))_0_0_var(--tw-prose-underline,theme(colors.orange.800))] dark:hover:prose-a:[--tw-prose-underline-size:2px]",
                "prose-a:no-underline prose-a:shadow-[inset_0_calc(-1*(var(--tw-prose-underline-size,1px)+1px))_0_0_var(--tw-prose-underline,theme(colors.orange.300))] hover:prose-a:[--tw-prose-underline-size:2px] dark:[--tw-prose-background:theme(colors.gray.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.orange.800))] dark:hover:prose-a:[--tw-prose-underline-size:4px]",
                // pre
                "prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:shadow-lg dark:prose-pre:bg-gray-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-gray-300/10",
                // hr
                "dark:prose-hr:border-gray-800"
            )}
            {...props}
        />
    )
}
