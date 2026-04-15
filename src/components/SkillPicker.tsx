import { useState } from "react";
import { X, Plus } from "lucide-react";

const ALL_SKILLS = [
  "JavaScript","TypeScript","Python","Java","C++","C","C#","Go","Rust","Ruby","PHP","Swift","Kotlin","Dart",
  "React","Next.js","Vue","Angular","Svelte",
  "Node.js","Express","Django","Flask","Laravel","Spring","FastAPI",
  "Flutter","React Native",
  "Docker","Kubernetes","AWS","GCP","Azure","Linux","Git","GitHub","Terraform","Ansible","Nginx",
  "PostgreSQL","MySQL","MongoDB","Redis","Firebase","Supabase","GraphQL",
  "TailwindCSS","Bootstrap","Sass","Figma","VS Code","Vite",
];

interface Props {
  selected: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillPicker({ selected, onChange }: Props) {
  const [filter, setFilter] = useState("");

  const toggle = (skill: string) => {
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill));
    } else {
      onChange([...selected, skill]);
    }
  };

  const filtered = ALL_SKILLS.filter(
    (s) =>
      s.toLowerCase().includes(filter.toLowerCase()) && !selected.includes(s)
  );

  return (
    <div className="space-y-3">
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1 rounded-full bg-purple-600/40 px-3 py-0.5 text-xs font-medium text-purple-200"
            >
              {s}
              <button
                onClick={() => toggle(s)}
                className="ml-0.5 text-purple-300 hover:text-white"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
      {/* Search */}
      <input
        type="text"
        placeholder="Search skills…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none ring-purple-500 focus:border-purple-500 focus:ring-1"
      />
      {/* Grid */}
      <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1">
        {filtered.map((s) => (
          <button
            key={s}
            onClick={() => toggle(s)}
            className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-white/70 transition hover:border-purple-400 hover:text-white"
          >
            <Plus size={10} />
            {s}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-white/30">No matches found</p>
        )}
      </div>
    </div>
  );
}
