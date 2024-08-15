import "css/prism.css"
import "katex/dist/katex.css"

import { MDXLayoutRenderer } from "pliny/mdx-components"
import { allTopics } from "contentlayer/generated"
import TopicLayout from "@/components/bitcoin-topics/layouts/TopicLayout"
import { components } from "@/components/bitcoin-topics/markdown-ui/MDXComponents"
import { Metadata } from "next"
import siteMetadata from "@/data/siteMetadata"
import { getAuthorDetails, getTopicData } from "@/utils/content-utils"
import { Space_Grotesk, Sriracha } from "next/font/google"

const space_grotesk = Space_Grotesk({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-space-grotesk"
})
export async function generateMetadata({
    params
}: {
    params: { slug: string[] }
}): Promise<Metadata | undefined> {
    const slug = decodeURI(params.slug.join("/"))
    const post = allTopics.find((p) => p.slug === slug)
    const authorList = post?.authors || ["default"]
    const authorDetails = getAuthorDetails(authorList)
    if (!post) {
        return
    }

    const publishedAt = new Date(post.date).toISOString()
    const modifiedAt = new Date(post.lastmod || post.date).toISOString()
    const authors = authorDetails.map((author) => author.name)
    let imageList = [siteMetadata.socialBanner]
    if (post.images) {
        imageList =
            typeof post.images === "string" ? [post.images] : post.images
    }
    const ogImages = imageList.map((img) => {
        return {
            url: img.includes("http") ? img : siteMetadata.siteUrl + img
        }
    })

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            siteName: siteMetadata.title,
            locale: "en_US",
            type: "article",
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            url: "./",
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.summary,
            images: imageList
        }
    }
}

export const generateStaticParams = async () => {
    const paths = allTopics.map((p) => ({ slug: p.slug.split("/") }))

    return paths
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slug = decodeURI(params.slug.join("/"))
    const { prev, next, post, authorDetails, mainContent, jsonLd } =
        getTopicData(slug)

    return (
        <>
            <div className={`${space_grotesk.variable} scroll-smooth`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <TopicLayout
                    content={mainContent}
                    authorDetails={authorDetails}
                    next={next}
                    prev={prev}
                >
                    <MDXLayoutRenderer
                        code={post.body.code}
                        components={components}
                        toc={post.toc}
                    />
                </TopicLayout>
            </div>
        </>
    )
}
