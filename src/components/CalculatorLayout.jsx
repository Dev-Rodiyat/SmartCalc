import React from "react";

const CalculatorLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4 py-10 rounded-2xl">
      <div className="w-full flex flex-col gap-6 mx-auto p-5 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 font-inter">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">{title}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CalculatorLayout;