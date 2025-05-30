interface ValidationRule {
  label: string;
  isValid: boolean;
}

export default function ValidationList({ rules }: { rules: ValidationRule[] }) {
  return (
    <ul className="text-left text-sm space-y-1">
      {rules.map((rule, index) => (
        <li key={index} className={`flex items-center gap-2 ${rule.isValid ? "text-green-600" : "text-red-500"}`}>
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
