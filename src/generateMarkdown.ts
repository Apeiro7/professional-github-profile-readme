import { ProfileData } from "./types";

export function generateMarkdown(data: ProfileData): string {
  const lines: string[] = [];

  // ── Banner / Greeting ──────────────────────────────────────────────────────
  if (data.name) {
    lines.push(
      `<h1 align="center">Hi 👋, I'm ${data.name}</h1>`
    );
  }
  if (data.title) {
    lines.push(`<h3 align="center">${data.title}</h3>`);
  }
  if (data.subtitle) {
    lines.push(`<p align="center">${data.subtitle}</p>`);
  }

  lines.push("");

  // ── Visitors badge ─────────────────────────────────────────────────────────
  if (data.visitorsCount && data.username) {
    lines.push(
      `<p align="center">`,
      `  <img src="https://komarev.com/ghpvc/?username=${data.username}&label=Profile%20views&color=0e75b6&style=flat" alt="Profile views" />`,
      `</p>`,
      ``
    );
  }

  // ── About me bullets ──────────────────────────────────────────────────────
  const bullets: string[] = [];
  if (data.currentWork)
    bullets.push(`- 🔭 I'm currently working on **${data.currentWork}**`);
  if (data.currentLearn)
    bullets.push(`- 🌱 I'm currently learning **${data.currentLearn}**`);
  if (data.about) bullets.push(`- 💬 About me: ${data.about}`);
  if (data.location) bullets.push(`- 📍 Based in **${data.location}**`);
  if (data.email)
    bullets.push(
      `- 📫 Reach me at **[${data.email}](mailto:${data.email})**`
    );
  if (data.website)
    bullets.push(`- 🌐 Check out my website **[${data.website}](https://${data.website.replace(/^https?:\/\//, "")})**`);
  if (data.funFact) bullets.push(`- ⚡ Fun fact: *${data.funFact}*`);

  if (bullets.length > 0) {
    lines.push(...bullets, "");
  }

  // ── Social badges ─────────────────────────────────────────────────────────
  const socials: string[] = [];
  if (data.twitter)
    socials.push(
      `[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/${data.twitter})`
    );
  if (data.linkedin)
    socials.push(
      `[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${data.linkedin})`
    );
  if (data.devto)
    socials.push(
      `[![Dev.to](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white)](https://dev.to/${data.devto})`
    );
  if (data.username)
    socials.push(
      `[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${data.username})`
    );

  if (socials.length > 0) {
    lines.push(`## 🌐 Connect with me`, "", socials.join("  "), "");
  }

  // ── Skills ─────────────────────────────────────────────────────────────────
  if (data.skills.length > 0) {
    lines.push(`## 🛠️ Tech Stack`, "");
    const badges = data.skills.map((skill) => skillBadge(skill)).filter(Boolean);
    lines.push(badges.join("  "), "");
  }

  // ── GitHub Stats ──────────────────────────────────────────────────────────
  if (
    data.username &&
    (data.githubStats || data.streakStats || data.topLangs || data.trophies)
  ) {
    lines.push(`## 📊 GitHub Stats`, "");

    if (data.trophies) {
      lines.push(
        `<p align="center">`,
        `  <img src="https://github-profile-trophy.vercel.app/?username=${data.username}&theme=radical&no-frame=true&no-bg=false&margin-w=4" alt="Trophies"/>`,
        `</p>`,
        ``
      );
    }

    const statCards: string[] = [];

    if (data.githubStats) {
      statCards.push(
        `  <img src="https://github-readme-stats.vercel.app/api?username=${data.username}&show_icons=true&theme=radical&hide_border=true" alt="GitHub Stats" />`
      );
    }
    if (data.topLangs) {
      statCards.push(
        `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.username}&layout=compact&theme=radical&hide_border=true" alt="Top Languages" />`
      );
    }

    if (statCards.length > 0) {
      lines.push(
        `<p align="center">`,
        ...statCards,
        `</p>`,
        ``
      );
    }

    if (data.streakStats) {
      lines.push(
        `<p align="center">`,
        `  <img src="https://streak-stats.demolab.com?user=${data.username}&theme=radical&hide_border=true" alt="GitHub Streak" />`,
        `</p>`,
        ``
      );
    }
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  lines.push(
    `---`,
    `<p align="center">`,
    `  <em>⭐ From <a href="https://github.com/${data.username || "yourusername"}">${data.username || "yourusername"}</a> — Made with ❤️</em>`,
    `</p>`
  );

  return lines.join("\n");
}

// ── Skill badge helper ────────────────────────────────────────────────────────
function skillBadge(skill: string): string {
  const map: Record<string, { logo: string; color: string; label?: string }> = {
    JavaScript: { logo: "javascript", color: "F7DF1E", label: "JavaScript" },
    TypeScript: { logo: "typescript", color: "3178C6", label: "TypeScript" },
    Python: { logo: "python", color: "3776AB", label: "Python" },
    Java: { logo: "openjdk", color: "ED8B00", label: "Java" },
    "C++": { logo: "cplusplus", color: "00599C", label: "C%2B%2B" },
    C: { logo: "c", color: "A8B9CC", label: "C" },
    "C#": { logo: "csharp", color: "239120", label: "C%23" },
    Go: { logo: "go", color: "00ADD8", label: "Go" },
    Rust: { logo: "rust", color: "000000", label: "Rust" },
    Ruby: { logo: "ruby", color: "CC342D", label: "Ruby" },
    PHP: { logo: "php", color: "777BB4", label: "PHP" },
    Swift: { logo: "swift", color: "FA7343", label: "Swift" },
    Kotlin: { logo: "kotlin", color: "7F52FF", label: "Kotlin" },
    Dart: { logo: "dart", color: "0175C2", label: "Dart" },
    React: { logo: "react", color: "20232a", label: "React" },
    "Next.js": { logo: "nextdotjs", color: "000000", label: "Next.js" },
    Vue: { logo: "vuedotjs", color: "4FC08D", label: "Vue.js" },
    Angular: { logo: "angular", color: "DD0031", label: "Angular" },
    Svelte: { logo: "svelte", color: "FF3E00", label: "Svelte" },
    "Node.js": { logo: "nodedotjs", color: "339933", label: "Node.js" },
    Express: { logo: "express", color: "000000", label: "Express" },
    Django: { logo: "django", color: "092E20", label: "Django" },
    Flask: { logo: "flask", color: "000000", label: "Flask" },
    Laravel: { logo: "laravel", color: "FF2D20", label: "Laravel" },
    Spring: { logo: "spring", color: "6DB33F", label: "Spring" },
    FastAPI: { logo: "fastapi", color: "009688", label: "FastAPI" },
    Flutter: { logo: "flutter", color: "02569B", label: "Flutter" },
    "React Native": { logo: "react", color: "20232a", label: "React Native" },
    Docker: { logo: "docker", color: "2496ED", label: "Docker" },
    Kubernetes: { logo: "kubernetes", color: "326CE5", label: "Kubernetes" },
    AWS: { logo: "amazonaws", color: "FF9900", label: "AWS" },
    GCP: { logo: "googlecloud", color: "4285F4", label: "GCP" },
    Azure: { logo: "microsoftazure", color: "0078D4", label: "Azure" },
    Linux: { logo: "linux", color: "FCC624", label: "Linux" },
    Git: { logo: "git", color: "F05032", label: "Git" },
    GitHub: { logo: "github", color: "181717", label: "GitHub" },
    PostgreSQL: { logo: "postgresql", color: "336791", label: "PostgreSQL" },
    MySQL: { logo: "mysql", color: "4479A1", label: "MySQL" },
    MongoDB: { logo: "mongodb", color: "47A248", label: "MongoDB" },
    Redis: { logo: "redis", color: "DC382D", label: "Redis" },
    Firebase: { logo: "firebase", color: "FFCA28", label: "Firebase" },
    Supabase: { logo: "supabase", color: "3ECF8E", label: "Supabase" },
    GraphQL: { logo: "graphql", color: "E10098", label: "GraphQL" },
    TailwindCSS: { logo: "tailwindcss", color: "38B2AC", label: "Tailwind CSS" },
    Bootstrap: { logo: "bootstrap", color: "7952B3", label: "Bootstrap" },
    Sass: { logo: "sass", color: "CC6699", label: "Sass" },
    Figma: { logo: "figma", color: "F24E1E", label: "Figma" },
    "VS Code": { logo: "visualstudiocode", color: "007ACC", label: "VS Code" },
    Terraform: { logo: "terraform", color: "7B42BC", label: "Terraform" },
    Ansible: { logo: "ansible", color: "EE0000", label: "Ansible" },
    Nginx: { logo: "nginx", color: "009639", label: "Nginx" },
    Vite: { logo: "vite", color: "646CFF", label: "Vite" },
  };

  const entry = map[skill];
  if (!entry) return "";
  const label = entry.label ?? skill;
  const logoColor = entry.color === "F7DF1E" || entry.color === "FFCA28" ? "000000" : "white";
  return `![${skill}](https://img.shields.io/badge/${encodeURIComponent(label)}-${entry.color}?style=for-the-badge&logo=${entry.logo}&logoColor=${logoColor})`;
}
