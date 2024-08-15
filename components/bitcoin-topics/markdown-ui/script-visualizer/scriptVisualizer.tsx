"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import {
    PlayIcon,
    PauseIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon
} from "@heroicons/react/20/solid"
import { SvgConfig, svgConfigs } from "./svg-config"

interface SvgatorPlayer {
    ready: (callback: () => void) => void
    pause: () => void
    seekTo: (time: number) => void
    play: () => void
    duration: number
    currentTime: number
}

interface ScriptStackVisualizerProps {
    type: string
}

export default function ScriptStackVisualizer({
    type
}: ScriptStackVisualizerProps) {
    const [config, setConfig] = useState<SvgConfig | null>(null)
    const [currentStep, setCurrentStep] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false)
    const svgRef = useRef<HTMLObjectElement>(null)
    const playerRef = useRef<SvgatorPlayer | null>(null)

    useEffect(() => {
        const selectedConfig = svgConfigs[type as keyof typeof svgConfigs]
        setConfig(selectedConfig || null)
    }, [type])

    const cumulativeDurations = config
        ? config.steps.reduce((acc, step, index) => {
              acc[index] = (acc[index - 1] || 0) + step.duration * 1000
              return acc
          }, [] as number[])
        : []

    const initializeSvgPlayer = useCallback(() => {
        if (!config) return

        if (svgRef.current && svgRef.current.contentDocument) {
            const svgElement = svgRef.current.contentDocument.getElementById(
                config.svgId
            ) as unknown as SVGSVGElement & { svgatorPlayer: SvgatorPlayer }
            if (svgElement && svgElement.svgatorPlayer) {
                playerRef.current = svgElement.svgatorPlayer
                playerRef.current.ready(() => {
                    playerRef.current?.pause()
                    playerRef.current?.seekTo(0)
                })
            }
        }
    }, [config])

    useEffect(() => {
        if (!config) return

        const timer = setTimeout(() => {
            initializeSvgPlayer()
        }, 100)
        return () => clearTimeout(timer)
    }, [initializeSvgPlayer, config])

    const playStepAnimation = (step: number) => {
        if (!config || !playerRef.current) return

        const startTime = step > 0 ? cumulativeDurations[step - 1] : 0
        const endTime = cumulativeDurations[step]
        playerRef.current.seekTo(startTime)
        playerRef.current.play()
        setIsPlaying(true)

        const animationDuration = endTime - startTime
        setTimeout(() => {
            playerRef.current?.pause()
            setIsPlaying(false)
        }, animationDuration)
    }

    const handlePlay = () => {
        if (!isPlaying && currentStep >= 0) {
            playStepAnimation(currentStep)
        }
    }

    const handlePause = () => {
        if (playerRef.current) {
            playerRef.current.pause()
            setIsPlaying(false)
        }
    }

    const handleStepChange = (direction: "next" | "prev") => {
        if (!config) return

        setCurrentStep((prev) => {
            const newStep =
                direction === "next"
                    ? Math.min(prev + 1, config.steps.length - 1)
                    : Math.max(prev - 1, 0)
            if (newStep >= 0) {
                playStepAnimation(newStep)
            }
            return newStep
        })
    }

    const handleStepClick = (index: number) => {
        setCurrentStep(index)
        playStepAnimation(index)
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ")
    }

    const getStatusIcon = (index: number) => {
        if (!config) return null

        if (currentStep >= config.steps.length - 1) {
            return (
                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            )
        } else if (index < currentStep) {
            return (
                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            )
        } else if (index === currentStep) {
            return <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
        } else {
            return (
                <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
            )
        }
    }

    if (!config) {
        return <div>Configuration not found for type: {type}</div>
    }

    return (
        <div className="mx-auto py-1 -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-32 xl:-mx-40">
            <div className="mx-auto py-1 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center py-3">
                    <div className="mx-auto flex w-full max-w-6xl flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg bg-[#272E35] p-4 shadow-md">
                        <div className="w-full lg:w-2/5">
                            <div className="flex justify-center items-center space-x-4 mb-4">
                                <button
                                    onClick={() => handleStepChange("prev")}
                                    className={`p-2 ${currentStep > 0 ? "text-[#E5E6F1] hover:text-orange-500" : "text-gray-400"} cursor-pointer rounded transition-colors duration-300`}
                                    disabled={currentStep <= 0}
                                >
                                    <ArrowLeftIcon className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={
                                        isPlaying ? handlePause : handlePlay
                                    }
                                    className={`cursor-pointer rounded p-2 ${currentStep >= 0 ? "text-[#E5E6F1] hover:text-orange-500" : "text-gray-400"} transition-colors duration-300`}
                                    disabled={currentStep < 0}
                                >
                                    {isPlaying ? (
                                        <PauseIcon className="h-6 w-6" />
                                    ) : (
                                        <PlayIcon className="h-6 w-6" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleStepChange("next")}
                                    className={`p-2 ${currentStep < config.steps.length - 1 ? "text-[#E5E6F1] hover:text-orange-500" : "text-gray-400"} cursor-pointer rounded transition-colors duration-300`}
                                    disabled={
                                        currentStep >= config.steps.length - 1
                                    }
                                >
                                    <ArrowRightIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <nav aria-label="Progress">
                                <ol role="list" className="space-y-4">
                                    {config.steps.map((step, index) => (
                                        <li
                                            key={step.name}
                                            className="relative"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleStepClick(index)
                                                }
                                                className="group relative flex w-full items-start text-left"
                                            >
                                                <span className="flex h-9 items-center">
                                                    <span
                                                        className={classNames(
                                                            currentStep >=
                                                                config.steps
                                                                    .length -
                                                                    1
                                                                ? "bg-green-500"
                                                                : index ===
                                                                    currentStep
                                                                  ? "bg-orange-500"
                                                                  : index <
                                                                      currentStep
                                                                    ? "bg-green-500"
                                                                    : "bg-[#454C54]",
                                                            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-600 group-hover:border-gray-400"
                                                        )}
                                                    >
                                                        {getStatusIcon(index)}
                                                    </span>
                                                </span>
                                                <span className="ml-4 flex min-w-0 flex-col">
                                                    <span
                                                        className={classNames(
                                                            index <= currentStep
                                                                ? "text-orange-500"
                                                                : "text-[#E5E6F1]",
                                                            "text-sm font-medium"
                                                        )}
                                                    >
                                                        {step.name}
                                                    </span>
                                                    <span className="text-sm text-gray-400">
                                                        {step.description}
                                                    </span>
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>

                        <div className="w-full lg:w-3/5 bg-[#454C54] rounded-lg shadow-md overflow-hidden">
                            <object
                                ref={svgRef}
                                type="image/svg+xml"
                                data={config.svgPath}
                                className="w-full h-full"
                                aria-labelledby="svgAnimation"
                                role="img"
                            >
                                Your browser does not support SVGs
                            </object>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
