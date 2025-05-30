import { useState, useRef } from "react";

type Rule = {
  label: string;
  isValid: boolean;
};

type Props = {
  rules: Rule[];
};

export default function ValidationPopover({ rules }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative inline-block ml-2" ref={ref}>
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="text-blue-600 hover:text-blue-800 focus:outline-none"
        title="Show validation rules"
      >
        ℹ️
      </button>

      {visible && (
        <div className="absolute z-10 mt-2 w-64 p-3 bg-white border border-gray-300 shadow-lg rounded text-left text-sm space-y-1">
          <button
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-xs"
            onClick={() => setVisible(false)}
          >
            ✖
          </button>
          {rules.map((rule, i) => (
            <div key={i} className={`flex items-start gap-2 ${rule.isValid ? "text-green-600" : "text-gray-700"}`}>
              <span>{rule.isValid ? "✅" : "•"}</span>
              {rule.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
