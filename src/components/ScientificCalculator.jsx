import React, { useState } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { MdHistory } from "react-icons/md";
import HistoryModal from "./HistoryModal";
import { useCalcHistory } from "../context/HistoryContext";
import { evaluate as mathEval, pi, sqrt, sin, cos, tan, log, log10 } from "mathjs";

const sciButtons = [
    ["AC", "DEL", "(", ")", "%"],
    ["7", "8", "9", "/", "√"],
    ["4", "5", "6", "×", "^"],
    ["1", "2", "3", "-", "log"],
    [".", "0", "+", "x²", "ln"],
    ["sin", "cos", "tan", "π", "="],
];

const ScientificCalculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const { history, setHistory } = useCalcHistory();

    const transformExpression = (expression) => {
        return expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/π/g, "pi")
            .replace(/√/g, "sqrt")
            .replace(/(\d+(\.\d+)?)%/g, "($1/100)")
            .replace(/sin\(([^)]+)\)/g, (_, val) => `sin((${val}) * pi / 180)`)
            .replace(/cos\(([^)]+)\)/g, (_, val) => `cos((${val}) * pi / 180)`)
            .replace(/tan\(([^)]+)\)/g, (_, val) => `tan((${val}) * pi / 180)`)
            .replace(/x²/g, "^2");
    };

    const evaluate = () => {
        try {
            const expr = transformExpression(input);
            const res = mathEval(expr);
            setInput(String(res));
            setResult("");
            setHistory((prev) => [...prev, { input, result: res }]);
        } catch (error) {
            setInput("Error");
            setResult("");
        }
    };

    const handleClick = (val) => {
        if (input === "Error" && val !== "AC") return;

        const wrapLastNumber = (func) => {
            const match = input.match(/([0-9.]+)$|(\))$/);
            if (match) {
                const last = match[0];
                const index = input.lastIndexOf(last);
                const before = input.slice(0, index);
                return `${before}${func}(${last})`;
            } else {
                return input + `${func}(`;
            }
        };

        switch (val) {
            case "AC":
                return setInput("");
            case "DEL":
                return setInput((prev) => prev.slice(0, -1));
            case "=":
                return evaluate();
            case "x²":
                return setInput((prev) => prev + "^2");
            case "√":
                return setInput((prev) => wrapLastNumber("sqrt"));
            case "sin":
            case "cos":
            case "tan":
            case "log":
                return setInput((prev) => wrapLastNumber(val));
            case "ln":
                return setInput((prev) => wrapLastNumber("log"));
            case "π":
                return setInput((prev) => prev + "π");
            default:
                return setInput((prev) => prev + val);
        }
    };

    const highlightExpression = (expression) => {
        const tokens = expression.match(/(sin|cos|tan|log|ln|sqrt|pi|π|\d+\.?\d*|[+\-×÷^()%])/gi) || [];

        return tokens.map((token, idx) => {
            const className =
                /^[0-9.]+$/.test(token)
                    ? "text-blue-500"
                    : /[+\-×÷^]/.test(token)
                        ? "text-orange-500"
                        : /sin|cos|tan|log|ln|sqrt/.test(token)
                            ? "text-purple-500"
                            : /π|pi/.test(token)
                                ? "text-pink-500"
                                : "text-zinc-600 dark:text-zinc-400";

            return (
                <span key={idx} className={`${className} px-[1px]`}>
                    {token}
                </span>
            );
        });
    };

    return (
        <CalculatorLayout>
            <div className="mt-6 relative">
                <div className="bg-gray-200 hover:bg-gray-300 p-3 sm:p-4 rounded-xl min-h-[80px] sm:min-h-[100px] text-right flex flex-col justify-end overflow-x-auto relative">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="absolute left-3 top-10 text-gray-500 hover:text-black z-10"
                        title="View History"
                    >
                        <MdHistory size={22} />
                    </button>

                    <div className="text-xl sm:text-3xl break-words pl-4 sm:pl-8 whitespace-pre-wrap">
                        {highlightExpression(input || "0")}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4 px-2 sm:px-0">
                {sciButtons.flat().map((btn, i) =>
                    btn ? (
                        <button
                            key={i}
                            onClick={() => handleClick(btn)}
                            className={`btn font-semibold transition shadow-sm ${btn === "="
                                ? "bg-green-600 text-white hover:bg-green-700 col-span-3 sm:col-span-1"
                                : btn === "AC" || btn === "DEL"
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : ["x²", "-", "/", "^", "(", ")", "×"].includes(btn)
                                        ? "bg-gray-300 text-zinc-800 hover:bg-gray-400"
                                        : "bg-gray-200 text-zinc-700 hover:bg-gray-300"
                                }`}
                        >
                            {btn}
                        </button>
                    ) : (
                        <div key={i} />
                    )
                )}
                {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
            </div>
        </CalculatorLayout>
    );
};

export default ScientificCalculator;
