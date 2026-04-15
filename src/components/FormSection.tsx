import React from "react";

interface Props {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function FormSection({ title, icon, children }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-purple-300">
        {icon}
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
