"use client"
import { useState } from "react"

/**
 * Decompiles a P2MS ScriptPubKey from a hex string.
 *
 * @param {string} scriptPubKeyHex - The hex-encoded ScriptPubKey.
 * @returns {object} - An object containing the number of required signatures and the public keys.
 */

function decompileP2MSScriptPubKey(scriptPubKeyHex: string) {
    const scriptPubKey = Buffer.from(scriptPubKeyHex, "hex")
    const script: (number | Buffer)[] = []
    let i = 0

    while (i < scriptPubKey.length) {
        const byte = scriptPubKey[i]

        // If the byte represents an opcode
        if (byte >= 0x01 && byte <= 0x4b) {
            const dataLength = byte
            const data = scriptPubKey.slice(i + 1, i + 1 + dataLength)
            script.push(data)
            i += 1 + dataLength
        } else {
            script.push(byte)
            i += 1
        }
    }

    // Validate if it's a P2MS script
    const opCheckMultiSig = 0xae
    if (script[script.length - 1] !== opCheckMultiSig) {
        throw new Error("Invalid P2MS ScriptPubKey")
    }

    // Ensure the first element is a number
    if (typeof script[0] !== "number") {
        throw new Error(
            "Invalid P2MS ScriptPubKey: First element should be a number"
        )
    }

    const m = script[0] - 0x50 // Number of required signatures (subtract 0x50 from the opcode value)
    const publicKeys = script.slice(1, -2).map((key) => {
        if (Buffer.isBuffer(key)) {
            return key.toString("hex")
        }
        throw new Error("Invalid public key in P2MS ScriptPubKey")
    })

    return {
        requiredSignatures: m,
        publicKeys: publicKeys
    }
}

export default function P2MSDecompile() {
    const [hexInput, setHexInput] = useState("")
    const [result, setResult] = useState<null | {
        requiredSignatures: number
        publicKeys: string[]
    }>(null)
    const [error, setError] = useState<null | string>(null)

    const handleDecompile = () => {
        try {
            const parsedResult = decompileP2MSScriptPubKey(hexInput)
            setResult(parsedResult)
            setError(null)
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message)
            } else {
                setError("An unknown error occurred")
            }
            setResult(null)
        }
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">
                P2MS ScriptPubKey Decompiler
            </h1>
            <div className="mb-4">
                <label
                    htmlFor="hexInput"
                    className="block text-sm font-medium text-gray-700"
                >
                    ScriptPubKey (Hex):
                </label>
                <input
                    type="text"
                    id="hexInput"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                    value={hexInput}
                    onChange={(e) => setHexInput(e.target.value)}
                    placeholder="Enter the hex-encoded ScriptPubKey"
                />
            </div>
            <button
                onClick={handleDecompile}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
                Decompile
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {result && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-xl font-semibold">
                        Decompiled Result:
                    </h2>
                    <p className="mt-2">
                        <strong>Required Signatures:</strong>{" "}
                        {result.requiredSignatures}
                    </p>
                    <div className="mt-2">
                        <strong>Public Keys:</strong>
                        <ul className="list-disc list-inside">
                            {result.publicKeys.map((key, index) => (
                                <li key={index}>{key}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
