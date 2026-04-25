import React, { useState } from "react";
import { MatrixSchema } from "../src/lib/schema";
import { Check, X } from "lucide-react";

interface IProps {
  data: MatrixSchema | null;
}

const StructuredVacancy = ({ data }: IProps) => {
  const [showJSON, setShowJSON] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
        <h2 className="text-2xl font-bold text-slate-800">{data?.title}</h2>
        <span className="text-blue-600 font-medium uppercase text-sm">
          {data?.seniority}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {Object.entries(data?.skills || {}).map(([category, list]) => {
            if (!Array.isArray(list) || list.length === 0) return null;
            return (
              <div key={category} className="flex flex-col gap-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pt-6 border-t border-slate-100">
          <div>
            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-4">
              Must Have
            </h4>
            <ul className="space-y-2">
              {data?.mustHave.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 flex items-start gap-2"
                >
                  <span className="text-red-400 mt-1">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-4">
              Nice to Have
            </h4>
            <ul className="space-y-2">
              {data?.niceToHave.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 flex items-start gap-2"
                >
                  <span className="text-emerald-400 mt-1">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-slate-50 rounded-xl">
          <p className="text-slate-800 text-sm">Salary Range</p>
          <p className="text-xl font-bold text-slate-800">
            {data?.salary?.min} - {data?.salary?.max} {data?.salary?.currency}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowJSON(!showJSON)}
              className="text-sm font-bold bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-md"
            >
              {showJSON ? "Hide Raw JSON" : "Show Raw JSON"}
            </button>

            {showJSON ? (
              <Check className="text-black" />
            ) : (
              <X className="text-black" />
            )}
          </div>
          {showJSON && (
            <div className="relative group">
              <pre className="bg-slate-900 text-blue-300 p-6 rounded-2xl text-[13px] overflow-x-auto font-mono leading-relaxed shadow-2xl max-h-[400px]">
                {JSON.stringify(data, null, 2)}
              </pre>
              <div className="absolute bottom-4 right-6 text-[10px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                Valid JSON (Zod Verified)
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/*   */

export default StructuredVacancy;
