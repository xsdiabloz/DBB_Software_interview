"use client";

import { useState } from "react";
import TextArea from "./components/TextArea";
import StructuredVacancy from "./components/StructuredVacancy";
import { MatrixSchema } from "./src/lib/schema";
import { analyzeVacancy } from "./actions/action";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<MatrixSchema | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) return;
    setIsLoading(true);

    try {
      const data = await analyzeVacancy(value);
      setResult(data);
      toast.success("Vacancy was structured!");
    } catch (error) {
      toast.error("Cannot structured vacancy, check console...");
      console.error("Analysis failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="max-w-2xl w-full text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Job <span className="text-blue-600">Matrix</span>
        </h1>
        <p className="mt-2 text-slate-500 text-lg">
          Paste the vacancy - to get a clear structur
        </p>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            <TextArea value={value} setValue={setValue} isLoading={isLoading} />
          </form>
        </section>

        {result ? (
          <StructuredVacancy data={result} />
        ) : (
          <section className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[400px] flex flex-col items-center justify-center text-slate-400">
              <div className="text-center">
                <p className="text-lg font-medium">
                  The Result will appear here
                </p>
                <p className="text-sm italic">
                  Use the form on the left for analyze
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
