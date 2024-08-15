"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import {
    CoreContent,
    allCoreContent,
    sortPosts
} from "pliny/utils/contentlayer"
import { Topic, allTopics } from "@/.contentlayer/generated"

interface NavigationLink {
    title: string
    href: string
    project: boolean
    children?: NavigationLink[]
}

interface NavigationCategory {
    title: string
    links: NavigationLink[]
}

const categoryOrder = [
    "Introduction",
    "Scripts",
    "BIPS",
    "Others",
    "Contribution"
]

export function Navigation({
    content,
    className,
    onLinkClick
}: {
    content: CoreContent<Topic>
    className?: string
    onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
    let pathname = usePathname()
    const posts = allCoreContent(sortPosts(allTopics))

    // Create a set of all child slugs
    const childSlugs = new Set(
        posts.flatMap((post) => post.childTopics?.childSlugs || [])
    )

    // Group posts by category, excluding child topics from the main list
    const groupedPosts: { [key: string]: Topic[] } = posts.reduce(
        (acc: { [key: string]: Topic[] }, post: any) => {
            if (!childSlugs.has(post.slug)) {
                const category = post.category || "Others"
                if (!acc[category]) {
                    acc[category] = []
                }
                acc[category].push(post)
            }
            return acc
        },
        {}
    )

    // Sort categories based on predefined order
    const sortedCategories = Object.keys(groupedPosts).sort((a, b) => {
        return categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
    })

    // Sort posts within each category based on the 'order' field
    Object.keys(groupedPosts).forEach((category) => {
        groupedPosts[category].sort((a: any, b: any) => {
            const orderA = a.order !== undefined ? a.order : Infinity
            const orderB = b.order !== undefined ? b.order : Infinity
            return orderA - orderB
        })
    })

    // Build navigation based on sorted categories
    const navigation: NavigationCategory[] = sortedCategories.map(
        (category) => ({
            title: category,
            links: groupedPosts[category].map((post) => ({
                title: post.title,
                href: `/${post.path}`,
                project: post.project || false,
                children:
                    post.childTopics?.childSlugs
                        .map((childSlug: any) => {
                            const childPost = posts.find(
                                (p) => p.slug === childSlug
                            )
                            return childPost
                                ? {
                                      title: childPost.title,
                                      href: `/${childPost.path}`,
                                      project: childPost.project || false
                                  }
                                : null
                        })
                        .filter(Boolean) || []
            }))
        })
    )

    return (
        <nav className={clsx("text-md lg:text-sm font-medium", className)}>
            <ul role="list" className="space-y-9">
                {navigation.map((section) => (
                    <li key={section.title}>
                        <h2 className="font-display font-bold text-gray-900 dark:text-white">
                            {section.title}
                        </h2>
                        <ul
                            role="list"
                            className="mt-2 space-y-5 border-l-2 border-gray-100 lg:mt-4 lg:space-y-5 lg:border-gray-200 dark:border-gray-800"
                        >
                            {section.links.map((link) => (
                                <li key={link.href} className="relative">
                                    <Link
                                        href={link.href}
                                        onClick={onLinkClick}
                                        className={clsx(
                                            "block font-medium w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-[0.5em] before:h-1.5 before:w-1.5 before:rounded-full",
                                            link.href === pathname
                                                ? "text-orange-500 before:bg-orange-500"
                                                : link.project
                                                  ? "text-cyan-500 before:hidden before:bg-cyan-500 hover:before:block"
                                                  : "text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-700 dark:hover:text-gray-300"
                                        )}
                                    >
                                        {link.title}
                                    </Link>
                                    {link.children &&
                                        link.children.length > 0 && (
                                            <ul className="mt-3 space-y-2 pl-3">
                                                {link.children.map(
                                                    (childLink) => (
                                                        <li
                                                            key={childLink.href}
                                                            className="relative"
                                                        >
                                                            <Link
                                                                href={
                                                                    childLink.href
                                                                }
                                                                onClick={
                                                                    onLinkClick
                                                                }
                                                                className={clsx(
                                                                    "block mt-2 font-normal w-full pl-5 before:pointer-events-none before:absolute before:-left-4 before:top-[0.5em] before:h-1.5 before:w-1.5 before:rounded-full",
                                                                    childLink.href ===
                                                                        pathname
                                                                        ? "text-orange-500 before:bg-orange-500"
                                                                        : childLink.project
                                                                          ? "text-orange-500 before:hidden before:bg-orange-500 hover:before:block"
                                                                          : "text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block dark:text-gray-400 dark:before:bg-gray-700 dark:hover:text-gray-300"
                                                                )}
                                                            >
                                                                {
                                                                    childLink.title
                                                                }
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
