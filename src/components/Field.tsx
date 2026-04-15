interface Props {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  prefix?: string;
}

export default function Field({
  label,
  id,
  placeholder,
  value,
  onChange,
  textarea,
  prefix,
}: Props) {
  const base =
    "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none ring-purple-500 transition focus:border-purple-500 focus:ring-1";

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-white/60">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base + " resize-y"}
        />
      ) : (
        <div className="flex items-center">
          {prefix && (
            <span className="rounded-l-lg border border-r-0 border-white/10 bg-white/10 px-2 py-2 text-xs text-white/50">
              {prefix}
            </span>
          )}
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={base + (prefix ? " rounded-l-none" : "")}
          />
        </div>
      )}
    </div>
  );
}
