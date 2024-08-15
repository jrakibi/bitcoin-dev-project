"use client"
import React, { useState, useEffect } from "react"
import TransactionDecoder from "./decodeTransaction"
import { motion } from "framer-motion"

interface TransactionsDisplayProps {
    rawTx: string
    txId?: string
    txTitle?: string
    highlightIndex?: { input?: number; output?: number }
}

interface ScriptDetail {
    asm: string
    hex: string
    type?: string
}

interface TransactionInput {
    txid: string
    n: number
    scriptSig: ScriptDetail
    sequence: number
    type?: string
    witness?: string[]
}

interface TransactionOutput {
    value: number
    n: number
    scriptPubKey: ScriptDetail
    type?: string
}

interface DecodedTransaction {
    txid: string
    version: number
    locktime: number
    inputs: TransactionInput[]
    outputs: TransactionOutput[]
    [key: string]: unknown
}

const BitcoinTransactionViewer: React.FC<{ detail: ScriptDetail }> = ({
    detail
}) => {
    const displayAsStack = (asm: string) => {
        if (!asm) return []
        const parts = asm.split(" ")
        return parts.map((part, index) => (
            <div
                key={index}
                className={
                    part.startsWith("OP_")
                        ? "font-bold text-orange-500"
                        : "text-gray-700 dark:text-gray-300"
                }
            >
                {part}
            </div>
        ))
    }

    return (
        <div className="h-full space-y-4 rounded-lg bg-white dark:bg-black p-3 font-mono text-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="w-full p-2 lg:w-1/2">
                    <strong className="mb-2 block text-gray-700 dark:text-gray-300">
                        ASM:
                    </strong>
                    <div className="mt-1 whitespace-pre-wrap break-words rounded-md border border-gray-300 bg-white dark:bg-black p-2 text-gray-700 dark:text-gray-300">
                        {detail.asm
                            ? displayAsStack(detail.asm)
                            : "ASM data not available"}
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/2">
                    <strong className="mb-2 block text-gray-700 dark:text-gray-300">
                        HEX:
                    </strong>
                    <div className="mt-1 whitespace-pre-wrap break-words rounded-md border border-gray-300 bg-white dark:bg-black p-2 text-gray-700 dark:text-gray-300">
                        {detail.hex || "HEX data not available"}
                    </div>
                </div>
            </div>
        </div>
    )
}

const TransactionsDisplay: React.FC<TransactionsDisplayProps> = ({
    rawTx,
    txId,
    txTitle,
    highlightIndex
}) => {
    const [decodedTransaction, setDecodedTransaction] =
        useState<DecodedTransaction | null>(null)
    const [selectedDetail, setSelectedDetail] = useState<ScriptDetail | null>(
        null
    )
    const [highlightedItemClicked, setHighlightedItemClicked] = useState(false)
    const [visibleItems, setVisibleItems] = useState({ inputs: 3, outputs: 3 })

    useEffect(() => {
        const decoder = new TransactionDecoder(rawTx, "mainnet")
        const decoded = decoder.decode()
        setDecodedTransaction(decoded as unknown as DecodedTransaction)
    }, [rawTx])

    const handleDetailChange = (
        detail: TransactionInput | TransactionOutput,
        index: number,
        type: "inputs" | "outputs"
    ) => {
        if ("scriptSig" in detail) {
            setSelectedDetail(
                selectedDetail === detail.scriptSig ? null : detail.scriptSig
            )
        } else if ("scriptPubKey" in detail) {
            setSelectedDetail(
                selectedDetail === detail.scriptPubKey
                    ? null
                    : detail.scriptPubKey
            )
        }

        if (
            highlightIndex &&
            highlightIndex[type as keyof typeof highlightIndex] === index
        ) {
            setHighlightedItemClicked((prev) => !prev)
        }
    }

    const renderItems = (items: any[], type: "inputs" | "outputs") => {
        const visibleCount = visibleItems[type]
        const displayedItems = items.slice(0, visibleCount)
        const remainingCount = items.length - visibleCount

        return (
            <>
                {displayedItems.map((item, index) => (
                    <motion.button
                        key={index}
                        className={`mb-2 cursor-pointer rounded-lg p-2 ${
                            highlightIndex?.[
                                type as keyof typeof highlightIndex
                            ] === index
                                ? "bg-orange-100 shadow-lg"
                                : "bg-white dark:bg-black"
                        }`}
                        onClick={() => handleDetailChange(item, index, type)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={
                            highlightIndex?.[
                                type as keyof typeof highlightIndex
                            ] === index && !highlightedItemClicked
                                ? {
                                      scale: [1, 1.03, 1],
                                      transition: {
                                          duration: 0.7,
                                          repeat: Infinity,
                                          repeatType: "reverse"
                                      }
                                  }
                                : {}
                        }
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className={`font-medium ${
                                    highlightIndex?.[
                                        type as keyof typeof highlightIndex
                                    ] === index
                                        ? "text-orange-600"
                                        : "text-gray-800 dark:text-gray-200"
                                }`}
                            >
                                {type === "inputs" ? "Input" : "Output"}{" "}
                                {index + 1}
                            </div>
                            <span
                                className={`rounded-full bg-orange-200 px-3 py-1 text-sm ${
                                    highlightIndex?.[
                                        type as keyof typeof highlightIndex
                                    ] === index
                                        ? "text-orange-600"
                                        : "text-black-800 dark:text-gray-800"
                                }`}
                            >
                                {type === "inputs"
                                    ? `Prev Out: ${item.type || "Unknown"}`
                                    : item.type || "Unknown"}
                            </span>
                        </div>
                        {type === "outputs" && (
                            <div className="text-left text-sm text-gray-600 dark:text-gray-400">
                                {item.value} BTC
                            </div>
                        )}
                    </motion.button>
                ))}
                {remainingCount > 0 && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-800 blur-sm"></div>
                        <button
                            onClick={() =>
                                setVisibleItems((prev) => ({
                                    ...prev,
                                    [type]: prev[type] + 3
                                }))
                            }
                            className="relative z-10 w-full py-2 mt-2 border border-orange-500 text-orange-500 rounded hover:bg-gray-100 hover:border-orange-600 hover:text-orange-600"
                        >
                            Show 3 more {type} ({remainingCount} remaining)
                        </button>
                    </div>
                )}
            </>
        )
    }

    return (
        <div className="container mx-auto py-1">
            <div className="mb-6 rounded-lg dark:bg-gray-900 bg-gray-50 p-3">
                <div className="h-full space-y-4 rounded-lg font-mono text-sm">
                    <div className="text-center">
                        {txTitle && (
                            <h1 className="mb-1 text-base font-semibold">
                                Transaction: {txTitle}
                            </h1>
                        )}
                        {txId && (
                            <p className="m-1 whitespace-pre-wrap break-words text-gray-600 dark:text-gray-400">
                                Transaction ID:{" "}
                                <a
                                    href={`https://mempool.space/tx/${txId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-gray-600 underline"
                                >
                                    {txId}
                                </a>
                            </p>
                        )}
                    </div>
                    <div className="relative flex flex-col items-start gap-3 lg:flex-row">
                        <div className="flex w-full flex-col p-2 lg:w-1/2">
                            <span className="font-semibold text-xl mt-4 mb-4">
                                Inputs{" "}
                                <span className="font-normal text-base">
                                    ({decodedTransaction?.inputs?.length})
                                </span>
                            </span>
                            {renderItems(
                                decodedTransaction?.inputs || [],
                                "inputs"
                            )}
                        </div>

                        {decodedTransaction?.inputs &&
                            decodedTransaction?.outputs &&
                            decodedTransaction.inputs.length > 0 &&
                            decodedTransaction.outputs.length > 0 && (
                                <svg
                                    className="my-4 transform fill-current text-gray-500 lg:mx-2 lg:my-0 lg:translate-y-1/2"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                                </svg>
                            )}
                        <div className="flex w-full flex-col p-2 lg:w-1/2">
                            <span className="font-semibold text-xl mt-4 mb-4">
                                Outputs{" "}
                                <span className="font-normal text-base">
                                    ({decodedTransaction?.outputs?.length})
                                </span>
                            </span>
                            {renderItems(
                                decodedTransaction?.outputs || [],
                                "outputs"
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {selectedDetail && (
                <div className="rounded-lg bg-gray-50  dark:bg-gray-900 p-3">
                    <BitcoinTransactionViewer detail={selectedDetail} />
                </div>
            )}
        </div>
    )
}

export default TransactionsDisplay
