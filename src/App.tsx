import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  User,
  Code2,
  BarChart2,
  Share2,
  Copy,
  CheckCheck,
  Eye,
  FileText,
  Edit3,
  Download,
  Sparkles,
} from "lucide-react";

import { ProfileData, Tab } from "./types";
import { generateMarkdown } from "./generateMarkdown";
import FormSection from "./components/FormSection";
import Field from "./components/Field";
import SkillPicker from "./components/SkillPicker";
import Toggle from "./components/Toggle";

const DEFAULT: ProfileData = {
  name: "Jane Doe",
  username: "janedoe",
  title: "Full Stack Developer & Open Source Enthusiast",
  subtitle: "Turning coffee into code, one commit at a time ☕",
  about: "I love building elegant solutions to complex problems.",
  location: "San Francisco, CA",
  email: "jane@example.com",
  website: "janedoe.dev",
  twitter: "janedoe",
  linkedin: "janedoe",
  devto: "janedoe",
  currentWork: "an awesome open-source project",
  currentLearn: "Rust & WebAssembly",
  funFact: "I debug faster with lo-fi music 🎵",
  skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "TailwindCSS"],
  githubStats: true,
  streakStats: true,
  topLangs: true,
  visitorsCount: true,
  trophies: true,
};

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "editor", label: "Editor", icon: <Edit3 size={14} /> },
  { id: "preview", label: "Preview", icon: <Eye size={14} /> },
  { id: "markdown", label: "Markdown", icon: <FileText size={14} /> },
];

export default function App() {
  const [data, setData] = useState<ProfileData>(DEFAULT);
  const [tab, setTab] = useState<Tab>("editor");
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const markdown = useMemo(() => generateMarkdown(data), [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d1a] via-[#12102a] to-[#0a0a1a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-900/40">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none tracking-tight text-white">
                GitHub Profile
              </h1>
              <p className="text-xs text-white/40">README Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/70 transition hover:border-purple-400 hover:text-white"
            >
              {copied ? (
                <CheckCheck size={14} className="text-green-400" />
              ) : (
                <Copy size={14} />
              )}
              {copied ? "Copied!" : "Copy MD"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:opacity-90"
            >
              <Download size={14} />
              Download
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/5 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex gap-1 py-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  tab === t.id
                    ? "bg-purple-600/30 text-purple-200"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
        {/* ── EDITOR ── */}
        {tab === "editor" && (
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Left column */}
            <div className="space-y-4">
              {/* Identity */}
              <FormSection title="Identity" icon={<User size={14} />}>
                <Field label="Full Name" id="name" placeholder="Jane Doe" value={data.name} onChange={(v) => set("name", v)} />
                <Field label="GitHub Username" id="username" placeholder="janedoe" value={data.username} onChange={(v) => set("username", v)} prefix="github.com/" />
                <Field label="Headline / Title" id="title" placeholder="Full Stack Developer" value={data.title} onChange={(v) => set("title", v)} />
                <Field label="Subtitle / Tagline" id="subtitle" placeholder="Turning coffee into code ☕" value={data.subtitle} onChange={(v) => set("subtitle", v)} />
              </FormSection>

              {/* About */}
              <FormSection title="About" icon={<Edit3 size={14} />}>
                <Field label="About Me" id="about" placeholder="Brief description about yourself…" value={data.about} onChange={(v) => set("about", v)} textarea />
                <Field label="Currently Working On" id="work" placeholder="An awesome SaaS app" value={data.currentWork} onChange={(v) => set("currentWork", v)} />
                <Field label="Currently Learning" id="learn" placeholder="Rust & WebAssembly" value={data.currentLearn} onChange={(v) => set("currentLearn", v)} />
                <Field label="Location" id="location" placeholder="San Francisco, CA" value={data.location} onChange={(v) => set("location", v)} />
                <Field label="Fun Fact" id="funFact" placeholder="Something interesting about you" value={data.funFact} onChange={(v) => set("funFact", v)} />
              </FormSection>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Social */}
              <FormSection title="Social Links" icon={<Share2 size={14} />}>
                <Field label="Email" id="email" placeholder="jane@example.com" value={data.email} onChange={(v) => set("email", v)} />
                <Field label="Website" id="website" placeholder="janedoe.dev" value={data.website} onChange={(v) => set("website", v)} />
                <Field label="Twitter / X" id="twitter" placeholder="janedoe" value={data.twitter} onChange={(v) => set("twitter", v)} prefix="@" />
                <Field label="LinkedIn" id="linkedin" placeholder="janedoe" value={data.linkedin} onChange={(v) => set("linkedin", v)} prefix="in/" />
                <Field label="Dev.to" id="devto" placeholder="janedoe" value={data.devto} onChange={(v) => set("devto", v)} prefix="dev.to/" />
              </FormSection>

              {/* Skills */}
              <FormSection title="Tech Stack" icon={<Code2 size={14} />}>
                <SkillPicker
                  selected={data.skills}
                  onChange={(skills) => set("skills", skills)}
                />
              </FormSection>

              {/* Stats */}
              <FormSection title="GitHub Widgets" icon={<BarChart2 size={14} />}>
                <Toggle
                  label="GitHub Stats Card"
                  description="Show stars, commits, PRs & issues"
                  checked={data.githubStats}
                  onChange={(v) => set("githubStats", v)}
                />
                <Toggle
                  label="Streak Stats"
                  description="Show current & longest streak"
                  checked={data.streakStats}
                  onChange={(v) => set("streakStats", v)}
                />
                <Toggle
                  label="Top Languages"
                  description="Display most-used languages"
                  checked={data.topLangs}
                  onChange={(v) => set("topLangs", v)}
                />
                <Toggle
                  label="Profile Trophies"
                  description="GitHub trophy showcase"
                  checked={data.trophies}
                  onChange={(v) => set("trophies", v)}
                />
                <Toggle
                  label="Visitor Counter"
                  description="Track profile view count"
                  checked={data.visitorsCount}
                  onChange={(v) => set("visitorsCount", v)}
                />
              </FormSection>
            </div>
          </div>
        )}

        {/* ── PREVIEW ── */}
        {tab === "preview" && (
          <div className="rounded-2xl border border-white/10 bg-white p-6 text-gray-900 shadow-2xl sm:p-10">
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-2 text-center text-3xl font-extrabold text-gray-900">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-xl font-bold text-gray-800 border-b pb-1">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-2 text-center text-lg font-semibold text-gray-700">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 space-y-1 pl-4">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="mt-1 text-purple-500">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline hover:text-purple-800"
                    >
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="mx-auto my-2 max-w-full rounded-lg"
                    />
                  ),
                  hr: () => <hr className="my-6 border-gray-200" />,
                  em: ({ children }) => (
                    <em className="italic text-gray-600">{children}</em>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">{children}</strong>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* ── MARKDOWN ── */}
        {tab === "markdown" && (
          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur transition hover:bg-white/20 hover:text-white"
            >
              {copied ? (
                <CheckCheck size={12} className="text-green-400" />
              ) : (
                <Copy size={12} />
              )}
              {copied ? "Copied!" : "Copy all"}
            </button>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-6 pt-12 text-sm leading-relaxed text-green-300 backdrop-blur">
              <code>{markdown}</code>
            </pre>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/5 py-6 text-center text-xs text-white/20">
        GitHub Profile README Generator — fill in the editor, preview your card, download & paste into your{" "}
        <code className="rounded bg-white/5 px-1 py-0.5">github.com/&lt;username&gt;/&lt;username&gt;</code>{" "}
        repository.
      </footer>
    </div>
  );
}
