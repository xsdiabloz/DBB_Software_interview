import { ArrowDownIcon } from "lucide-react";
import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  setValue: (val: string) => void;
  isLoading: boolean;
}

const TextArea = ({ value, setValue, isLoading }: IProps) => {
  return (
    <>
      <label className="text-sm font-semibold   text-slate-700 uppercase tracking-wider">
        Vacancy
      </label>
      <ArrowDownIcon className="text-black" />
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-64 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-slate-800"
        placeholder="copy and paste vacancy here..."
      ></textarea>
      <button
        disabled={isLoading || !value.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg active:scale-95 cursor-pointer shadow-blue-200"
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </>
  );
};

export default TextArea;
