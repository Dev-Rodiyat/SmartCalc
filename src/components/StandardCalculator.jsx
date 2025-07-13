import React, { useState, useRef } from "react";
import CalculatorLayout from "./CalculatorLayout";
import { MdHistory } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import HistoryModal from "./HistoryModal";
import { useCalcHistory } from "../context/HistoryContext";

const StandardCalculator = () => {
    const { history, setHistory } = useCalcHistory();
    const [input, setInput] = useState("");
    const [previewResult, setPreviewResult] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        try {
            const result = eval(e.target.value.replace(/×/g, "*").replace(/÷/g, "/"));
            setPreviewResult(result);
        } catch {
            setPreviewResult("");
        }
    };

    const handleClick = (val) => setInput((prev) => prev + val);
    const handleDelete = () => setInput((prev) => prev.slice(0, -1));
    const handleClear = () => {
        setInput("");
        setPreviewResult("");
    };

    const handleEqual = () => {
        try {
            const res = eval(input.replace(/×/g, "*").replace(/÷/g, "/"));
            setHistory([...history, { input, result: res }]);
            setInput(res.toString());
            setPreviewResult("");
        } catch {
            setPreviewResult("Error");
        }
    };

    return (
        <CalculatorLayout>
            <div className="relative">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black z-10"
                >
                    <MdHistory size={22} />
                </button>

                <input
                    type="text"
                    value={input}
                    ref={inputRef}
                    onChange={handleInputChange}
                    placeholder="0"
                    onKeyDown={(e) => {
                        const allowedKeys = [
                            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                            "+", "-", "*", "/", ".", "%", "(", ")",
                            "Backspace", "Enter", "Delete", "ArrowLeft", "ArrowRight"
                        ];

                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleEqual();
                        } else if (e.key === "Backspace") {
                            handleDelete();
                        } else if (!allowedKeys.includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    className="w-full px-6 py-8 bg-gray-200 rounded-xl text-right text-3xl outline-none"
                />
            </div>

            {previewResult && (
                <div className="text-right text-sm text-gray-500 mb-3">= {previewResult}</div>
            )}

            <div className="grid grid-cols-4 grid-rows-6 gap-2 mt-4">
                <button onClick={handleClear} className="btn bg-red-100 hover:bg-red-200 flex items-center justify-center">C</button>
                <button onClick={() => handleClick("(")} className="btn flex items-center justify-center">(</button>
                <button onClick={() => handleClick(")")} className="btn flex items-center justify-center">)</button>
                <button onClick={handleDelete} className="btn bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center">
                    <FiDelete size={20} />
                </button>

                <button onClick={() => handleClick("/")} className="btn flex items-center justify-center text-lg font-semibold">/</button>
                <button onClick={() => handleClick("×")} className="btn flex items-center justify-center text-lg font-semibold">×</button>
                <button onClick={() => handleClick("-")} className="btn flex items-center justify-center text-lg font-semibold">-</button>
                <button onClick={() => handleClick("+")} className="btn flex items-center justify-center text-lg font-semibold">+</button>

                {[..."789456123"].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleClick(num)}
                        className='btn flex items-center justify-center'
                    >
                        {num}
                    </button>
                ))}

                {/* Handle 0 to span two columns (optional) */}
                <button
                    onClick={() => handleClick("0")}
                    className="btn flex items-center justify-center"
                >
                    0
                </button>

                <button onClick={() => handleClick(".")} className="btn flex items-center justify-center">.</button>
                <button onClick={handleEqual} className="btn bg-green-100 hover:bg-green-200 flex items-center justify-center">=</button>
            </div>

            {showHistory && (
                <HistoryModal
                    onClose={() => setShowHistory(false)}
                />
            )}
        </CalculatorLayout>
    );
};

export default StandardCalculator;
