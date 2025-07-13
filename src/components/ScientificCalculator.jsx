import React, { useState, useEffect } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { MdHistory } from "react-icons/md";
import HistoryModal from "./HistoryModal";
import { useCalcHistory } from "../context/HistoryContext";

const sciButtons = [
    ["AC", "DEL", "(", ")", "%"],
    ["7", "8", "9", "/", "√"],
    ["4", "5", "6", "×", "^"],
    ["1", "2", "3", "-", "log"],
    ["0", ".", "=", "+", "ln"]
];

const ScientificCalculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const { history, setHistory, clearHistory, deleteHistoryItem } = useCalcHistory();

    useEffect(() => {
        const stored = localStorage.getItem("calc-history");
        if (stored) setHistory(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("calc-history", JSON.stringify(history));
    }, [history]);

    const evaluate = () => {
        try {
            let expr = input
                .replace(/×/g, "*")
                .replace(/√/g, "Math.sqrt")
                .replace(/log/g, "Math.log10")
                .replace(/ln/g, "Math.log")
                .replace(/\^/g, "**");
            let res = eval(expr);
            setResult(res);
            setHistory((prev) => [...prev, { input, result: res }]);
        } catch {
            setResult("Error");
        }
    };

    const handleClick = (val) => {
        if (val === "AC") return setInput("");
        if (val === "DEL") return setInput((prev) => prev.slice(0, -1));
        if (val === "=") return evaluate();
        setInput((prev) => prev + val);
    };

    const handleClearHistory = () => {
        setHistory([]);
        localStorage.removeItem("calc-history");
    };

    const handleDeleteItem = (indexToDelete) => {
        const updated = history.filter((_, index) => index !== indexToDelete);
        setHistory(updated);
        localStorage.setItem("calc-history", JSON.stringify(updated));
    };

    return (
        <CalculatorLayout title="SmartCalc" subtitle="A simple yet powerful calculator">
            <div className="mt-6 relative">
                <div className="bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 p-4 rounded-xl min-h-[100px] text-right flex flex-col justify-end overflow-x-auto relative">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="absolute left-3 top-10 text-gray-500 hover:text-black dark:hover:text-white z-10"
                        title="View History"
                    >
                        <MdHistory size={22} />
                    </button>

                    <div className="text-xl font-semibold text-zinc-900 dark:text-white break-words pl-8">
                        {result || ""}
                    </div>
                    <div className="text-3xl text-zinc-600 dark:text-zinc-400 break-words pl-8">
                        {input || "0"}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
                {sciButtons.flat().map((btn, i) =>
                    btn ? (
                        <button
                            key={i}
                            onClick={() => handleClick(btn)}
                            className={`btn font-semibold transition shadow-sm
                ${btn === "="
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : btn === "AC" || btn === "DEL"
                                        ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                                        : ["+", "-", "/", "^", "(", ")", "×"].includes(btn)
                                            ? "bg-gray-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-gray-400 dark:hover:bg-zinc-600"
                                            : "bg-gray-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-gray-300 dark:hover:bg-zinc-700"
                                }`}
                        >
                            {btn}
                        </button>
                    ) : (
                        <div key={i} />
                    )
                )}
                {showHistory && (
                    <HistoryModal
                        onClose={() => setShowHistory(false)}
                        history={history}
                        handleClearHistory={handleClearHistory}
                        handleDeleteItem={handleDeleteItem}
                    />
                )}
            </div>
        </CalculatorLayout>
    );
};
export default ScientificCalculator;