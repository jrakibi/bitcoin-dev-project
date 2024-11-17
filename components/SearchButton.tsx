import { KBarButton } from "pliny/search/KBarButton"
import siteMetadata from "@/data/siteMetadata"
import {
    Search,
    Brain,
    Book,
    Code2,
    GitBranch,
    Github,
    Users
} from "lucide-react"

const SearchHeader = () => {
    return (
        <div className="w-full border-b border-gray-800/10 dark:border-gray-800">
            <div className="grid grid-cols-3 items-center p-4 lg:px-8">
                {/* Quick Links - Left section */}
                <div className="flex items-center gap-4 text-xs">
                    <a
                        href="https://github.com/bitcoin-dev-project/decoding-bitcoin/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-orange-500 transition-colors duration-200 flex items-center gap-1.5"
                    >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                    </a>
                    <span
                        className="text-gray-400/50 cursor-not-allowed flex items-center gap-1.5"
                        title="Coming soon"
                    >
                        <GitBranch className="h-3.5 w-3.5" />
                        Roadmap
                    </span>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-orange-500 transition-colors duration-200 flex items-center gap-1.5"
                    >
                        <Users className="h-3.5 w-3.5" />
                        Community
                    </a>
                </div>

                {/* Search Section - Center section */}
                <div className="flex justify-center w-full">
                    <div className="w-full">
                        <KBarButton className="w-full" aria-label="Search">
                            <div
                                className="group relative flex items-center gap-3 rounded-lg w-full
                bg-[#1E1E1E]/80 hover:bg-[#2A2A2A]/90
                border border-gray-800/40 hover:border-gray-700/60
                shadow-sm hover:shadow-md
                backdrop-blur-xl
                transition-all duration-200 ease-in-out
                px-4 py-2.5"
                            >
                                {/* Search Icon and Input */}
                                <div className="flex items-center text-gray-400/80 group-hover:text-orange-500/90 transition-colors duration-200">
                                    <Search
                                        className="h-3.5 w-3.5"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <span className="flex-1 text-[13px] text-gray-400/90 group-hover:text-gray-300/90 transition-colors duration-200">
                                    Search documentation...
                                </span>
                                <div className="flex items-center gap-2 text-gray-500/80">
                                    <Brain className="h-3.5 w-3.5 text-orange-500/70 group-hover:text-orange-400/90" />
                                    <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-[#2C2C2E]/50 border border-gray-700/50 text-gray-400/90 font-mono text-[10px]">
                                        ⌘K
                                    </kbd>
                                </div>
                            </div>
                        </KBarButton>
                    </div>
                </div>

                {/* Empty Right section */}
                <div></div>
            </div>
        </div>
    )
}

export default SearchHeader
