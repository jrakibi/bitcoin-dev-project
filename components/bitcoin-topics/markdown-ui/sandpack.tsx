"use client"
import { Sandpack } from "@codesandbox/sandpack-react"
import { nightOwl } from "@codesandbox/sandpack-themes"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const DynamicSandpack = dynamic(
    () => import("@codesandbox/sandpack-react").then((mod) => mod.Sandpack),
    { ssr: false }
)

interface SandpackFiles {
    [key: string]: {
        code: string
        hidden?: boolean
    }
}

interface SandpackComponentProps {
    files: SandpackFiles
    options?: {
        showLineNumbers?: boolean
        showInlineErrors?: boolean
        editorHeight?: number
        [key: string]: any
    }
    template?: string
    customSetup?: {
        dependencies?: {
            [key: string]: string
        }
        [key: string]: any
    }
    theme?: any
}

const SandpackComponent: React.FC<SandpackComponentProps> = ({
    files,
    options = {
        showLineNumbers: true,
        showInlineErrors: true,
        editorHeight: 900
    },
    customSetup = {
        dependencies: {
            react: "^18.0.0",
            "react-dom": "^18.0.0"
        }
    },
    theme = nightOwl
}) => {
    return (
        <div className="mx-auto py-1 -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-32 xl:-mx-40">
            <DynamicSandpack
                files={files}
                template={"react"}
                theme={theme}
                options={{
                    ...options,
                    externalResources: ["https://cdn.tailwindcss.com"]
                }}
                customSetup={customSetup}
            />
        </div>
    )
}

export default SandpackComponent
