import React, { createContext, useContext, useState, useEffect } from "react";

const CalcHistoryContext = createContext();

export const CalcHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("calc-history");
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("calc-history", JSON.stringify(history));
    }, [history]);

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("calc-history");
    };

    const deleteHistoryItem = (indexToDelete) => {
        setHistory((prev) => {
            const updated = [...prev];
            updated.splice(prev.length - 1 - indexToDelete, 1);
            return updated;
        });
    };

    return (
        <CalcHistoryContext.Provider value={{ history, setHistory, clearHistory, deleteHistoryItem }}>
            {children}
        </CalcHistoryContext.Provider>
    );
};

export const useCalcHistory = () => useContext(CalcHistoryContext);
