"use client"
import { useState } from "react"
import { FaRedo } from "react-icons/fa"
interface ScriptDecoderProps {
    scriptHex: string
}

const opcodes: Record<string, string> = {
    "76": "OP_DUP",
    A9: "OP_HASH160",
    "88": "OP_EQUALVERIFY",
    AC: "OP_CHECKSIG",
    "14": "[OP_PUSHBYTES_20]"
}

export default function ScriptDecoder({ scriptHex }: ScriptDecoderProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [asm, setAsm] = useState<string[]>([])
    const [userChoices, setUserChoices] = useState<Record<number, string>>({})
    const [feedback, setFeedback] = useState<string>("")

    const bytes = scriptHex.match(/.{1,2}/g) || []

    const handleChoice = (choice: "opcode" | "data" | "length") => {
        const currentByte = bytes[currentIndex]
        let isCorrect = false
        let correctAnswer = ""

        if (choice === "opcode" && opcodes[currentByte]) {
            isCorrect = true
            correctAnswer = opcodes[currentByte]
            setCurrentIndex(currentIndex + 1)
        } else if (choice === "length" && currentByte === "14") {
            isCorrect = true
            correctAnswer = "PUSH 20"
            setCurrentIndex(currentIndex + 1)
        } else if (choice === "data" && currentIndex === 3) {
            isCorrect = true
            correctAnswer = bytes
                .slice(currentIndex, currentIndex + 20)
                .join("")
            setCurrentIndex(currentIndex + 20)
        }

        if (isCorrect) {
            setFeedback(`Correct!`)
            setAsm([...asm, correctAnswer])
        } else {
            setFeedback("Incorrect. Try again!")
        }
    }

    const resetExercise = () => {
        setCurrentIndex(0)
        setAsm([])
        setUserChoices({})
        setFeedback("")
    }

    return (
        <div className="mx-auto py-1 -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-32 xl:-mx-40">
            <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">ScriptPubKey Decoder</h1>
                    <button
                        onClick={resetExercise}
                        className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition duration-200"
                        title="Reset Exercise"
                    >
                        <FaRedo />
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        ScriptPubKey Hex:
                    </h2>
                    <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                        <code className="text-sm">{scriptHex}</code>
                    </div>
                </div>

                <div className="mb-6 flex flex-wrap">
                    {bytes.map((byte, index) => (
                        <span
                            key={index}
                            className={`inline-block w-10 h-10 m-1 text-center leading-10 rounded-md ${
                                index < currentIndex
                                    ? "bg-green-500 text-white"
                                    : index === currentIndex
                                      ? "bg-orange-500 text-white"
                                      : "bg-gray-200"
                            }`}
                        >
                            {byte}
                        </span>
                    ))}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Current Byte: {bytes[currentIndex]}
                    </h2>
                    <p className="mb-2">What does this represent?</p>
                    <div className="flex space-x-2">
                        {["Opcode", "Data", "Data Length"].map((choice) => (
                            <button
                                key={choice}
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200"
                                onClick={() =>
                                    handleChoice(
                                        choice
                                            .toLowerCase()
                                            .replace(" ", "") as
                                            | "opcode"
                                            | "data"
                                            | "length"
                                    )
                                }
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                </div>

                {feedback && (
                    <div className="mb-6">
                        <p
                            className={`font-bold ${feedback.startsWith("Correct") ? "text-green-600" : "text-red-600"}`}
                        >
                            {feedback}
                        </p>
                    </div>
                )}

                <div>
                    <h2 className="text-xl font-semibold mb-2">ASM:</h2>
                    <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                        <code className="text-sm">{asm.join(" ")}</code>
                    </div>
                </div>
            </div>
        </div>
    )
}
