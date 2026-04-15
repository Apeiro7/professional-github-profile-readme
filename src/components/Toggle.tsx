interface Props {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export default function Toggle({ label, description, checked, onChange }: Props) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="h-5 w-9 rounded-full bg-white/10 transition peer-checked:bg-purple-600" />
        <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-white/80">{label}</p>
        {description && <p className="text-xs text-white/40">{description}</p>}
      </div>
    </label>
  );
}
