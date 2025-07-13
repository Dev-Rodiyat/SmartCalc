import { IoClose } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { useCalcHistory } from "../context/HistoryContext";

const HistoryModal = ({ onClose }) => {
    const { history, clearHistory, deleteHistoryItem } = useCalcHistory();

    const reversedHistory = Array.isArray(history) ? [...history].reverse() : [];

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 font-inter flex justify-end"
            onClick={onClose} // Click outside to close
        >
            <div
                className="w-[95%] max-w-[360px] my-6 mr-6 flex flex-col rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden transition-all"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                {/* Header */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-200 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-semibold text-zinc-900">
                        History
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition"
                    >
                        <IoClose size={22} className="text-zinc-700" />
                    </button>
                </div>

                {/* History List */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 max-h-[70vh]">
                    {reversedHistory.length > 0 ? (
                        reversedHistory.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 bg-zinc-50 rounded-xl shadow-sm hover:bg-zinc-100 transition"
                            >
                                <div className="flex-1">
                                    <p className="text-sm text-zinc-800 font-medium">
                                        {item.input}
                                    </p>
                                    <p className="text-sm text-zinc-500 mt-1">
                                        = {item.result}
                                    </p>
                                </div>
                                <button
                                    onClick={() => deleteHistoryItem(index)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 active:bg-orange-100 transition"
                                >
                                    <IoClose size={18} className="text-zinc-600" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center text-zinc-600 py-12">
                            <MdHistory size={64} className="text-zinc-300 mb-4" />
                            <p className="font-medium">No history yet</p>
                            <p className="text-sm mt-1">Your calculations will show up here</p>
                        </div>
                    )}
                </div>

                {/* Clear All */}
                {reversedHistory.length > 0 && (
                    <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-zinc-200 flex justify-center">
                        <button
                            onClick={clearHistory}
                            className="py-2 px-6 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition"
                        >
                            Clear All
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryModal;
