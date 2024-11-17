"use client"

import { KBarSearchProvider } from "pliny/search/KBar"
import { useRouter } from "next/navigation"
import { CoreContent } from "pliny/utils/contentlayer"
import { Topic } from "contentlayer/generated"
import { Brain } from "lucide-react"

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const createChatBTCUrl = (query: string) => {
        return `https://chat.bitcoinsearch.xyz/?author=holocat&question=${encodeURIComponent(query)}`
    }

    return (
        <KBarSearchProvider
            kbarConfig={{
                searchDocumentsPath: "search.json",
                defaultActions: [
                    {
                        id: "ask-ai",
                        name: "Ask AI about Bitcoin",
                        keywords: "",
                        section: {
                            name: "AI Assistant",
                            priority: 1
                        },
                        subtitle:
                            "Get intelligent answers about Bitcoin concepts",
                        perform: () => {
                            const searchInput = document.querySelector(
                                'input[type="text"]'
                            ) as HTMLInputElement
                            const query = searchInput?.value || "Bitcoin"
                            window.open(createChatBTCUrl(query), "_blank")
                        },
                        icon: <Brain className="w-5 h-5 text-orange-500" />,
                        priority: 1
                    }
                ],
                onSearchDocumentsLoad(json) {
                    return json.map((post: CoreContent<Topic>) => ({
                        id: post.path,
                        name: post.title,
                        keywords: post?.summary || "",
                        section: "Documentation",
                        subtitle: post.tags?.join(", ") || "",
                        perform: () => router.push(post.path)
                    }))
                }
            }}
        >
            {children}
        </KBarSearchProvider>
    )
}
