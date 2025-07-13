import { useState } from "react";
import StandardCalculator from "./StandardCalculator";
import ScientificCalculator from "./ScientificCalculator";
import { useCalcHistory } from "../context/HistoryContext";

const CalculatorTabs = () => {
  const [activeTab, setActiveTab] = useState("standard");
  const { history, addToHistory, clearHistory } = useCalcHistory();

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === "standard"
                ? "bg-green-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700"
              }`}
            onClick={() => setActiveTab("standard")}
          >
            Standard
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === "scientific"
                ? "bg-green-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700"
              }`}
            onClick={() => setActiveTab("scientific")}
          >
            Scientific
          </button>
        </div>

        {/* Active Tab Content */}
        {activeTab === "standard" ? <StandardCalculator /> : <ScientificCalculator />}
      </div>
      <StandardCalculator
        history={history}
        setHistory={addToHistory}
        clearHistory={clearHistory}
      />
      <ScientificCalculator
        history={history}
        setHistory={addToHistory}
        clearHistory={clearHistory}
      />
    </div>
  );
};

export default CalculatorTabs;
