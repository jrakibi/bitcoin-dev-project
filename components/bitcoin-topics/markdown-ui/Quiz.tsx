"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowRight,
    CheckCircle,
    RotateCcw,
    Send,
    ThumbsUp,
    XCircle
} from "lucide-react"

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    disabled?: boolean
    icon: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    icon
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-5 py-2 rounded-lg flex items-center justify-between 
                ${disabled ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400" : "bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-600 dark:text-white hover:dark:bg-gray-500"}
                transition-colors duration-200 text-sm`}
    >
        <span className="font-semibold">{children}</span>
        <div className="flex items-center">
            <div className="w-px h-4 bg-gray-600 dark:bg-gray-400 mx-2"></div>
            {icon}
        </div>
    </button>
)

interface Question {
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
}

interface QuizProps {
    questions: Question[]
    questionText?: string
    showResult?: boolean
}

const Quiz: React.FC<QuizProps> = ({
    questions,
    questionText = "",
    showResult = true
}) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string>("")
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer)
    }

    const handleSubmit = () => {
        const correct =
            selectedAnswer === questions[currentQuestion].correctAnswer
        setIsCorrect(correct)
        setShowExplanation(true)
        if (correct) {
            setCorrectAnswersCount((prevCount) => prevCount + 1)
        }
    }

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
            setSelectedAnswer("")
            setShowExplanation(false)
            setIsCorrect(false)
        }
    }

    const handleReset = () => {
        setCurrentQuestion(0)
        setSelectedAnswer("")
        setShowExplanation(false)
        setIsCorrect(false)
        setCorrectAnswersCount(0)
    }

    const totalQuestions = questions.length
    const incorrectAnswersCount = totalQuestions - correctAnswersCount

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            {questionText && (
                <h2 className="text-lg font-semibold mb-4">{questionText}</h2>
            )}
            {!showExplanation || currentQuestion < totalQuestions - 1 ? (
                <>
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">
                            {questions[currentQuestion].question}
                        </h3>
                    </div>
                    <div className="space-y-2 mb-4">
                        {questions[currentQuestion].options.map(
                            (option, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={showExplanation}
                                    className="w-full text-left p-3 rounded-lg flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm"
                                    animate={
                                        selectedAnswer === option
                                            ? { scale: 1.05 }
                                            : { scale: 1 }
                                    }
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17
                                    }}
                                >
                                    <motion.span
                                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs
                              border-2 ${selectedAnswer === option && !showExplanation ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "border-gray-400 text-gray-400 dark:border-gray-300 dark:text-gray-300"}
                              ${showExplanation && option === questions[currentQuestion].correctAnswer ? "bg-green-500 border-green-500 text-white dark:bg-green-400 dark:border-green-400" : ""}
                              ${showExplanation && option === selectedAnswer && option !== questions[currentQuestion].correctAnswer ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : ""}`}
                                    >
                                        {index + 1}
                                    </motion.span>
                                    <span className="flex-grow">{option}</span>
                                    <AnimatePresence>
                                        {showExplanation &&
                                            option ===
                                                questions[currentQuestion]
                                                    .correctAnswer && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0
                                                    }}
                                                >
                                                    <CheckCircle
                                                        className="text-green-500 dark:text-green-400"
                                                        size={20}
                                                    />
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                </motion.button>
                            )
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        {!showExplanation ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={!selectedAnswer}
                                icon={<Send size={16} />}
                            >
                                SUBMIT
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNextQuestion}
                                disabled={
                                    currentQuestion >= questions.length - 1
                                }
                                icon={<ArrowRight size={16} />}
                            >
                                NEXT
                            </Button>
                        )}
                    </div>

                    <AnimatePresence>
                        {showExplanation && (
                            <motion.div
                                className={`mt-4 p-3 rounded-lg text-sm ${isCorrect ? "bg-green-100 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-800"}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center space-x-2 mb-2">
                                    {isCorrect ? (
                                        <CheckCircle
                                            className="text-green-500 dark:text-green-400"
                                            size={20}
                                        />
                                    ) : (
                                        <CheckCircle
                                            className="text-black dark:text-white"
                                            size={20}
                                        />
                                    )}
                                    <span
                                        className={`font-semibold ${isCorrect ? "text-green-700 dark:text-green-300" : "text-black dark:text-white"}`}
                                    >
                                        {isCorrect ? "Correct!" : "Incorrect"}
                                    </span>
                                </div>
                                <p>{questions[currentQuestion].explanation}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <motion.div
                    className="mt-4 p-5 rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-col items-center space-y-4">
                        {isCorrect ? (
                            <ThumbsUp
                                className="text-green-500 dark:text-green-400"
                                size={50}
                            />
                        ) : (
                            <XCircle
                                className="text-red-500 dark:text-red-400"
                                size={50}
                            />
                        )}
                        <h4 className="font-semibold text-lg">
                            Quiz Completed!
                        </h4>
                        {showResult && (
                            <p className="text-md text-gray-500 dark:text-gray-200">
                                You got {correctAnswersCount} out of{" "}
                                {totalQuestions} questions correct.
                            </p>
                        )}
                        <Button
                            onClick={handleReset}
                            icon={<RotateCcw size={20} />}
                        >
                            RESET QUIZ
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default Quiz
