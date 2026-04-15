export interface ProfileData {
  name: string;
  username: string;
  title: string;
  subtitle: string;
  about: string;
  location: string;
  email: string;
  website: string;
  twitter: string;
  linkedin: string;
  devto: string;
  currentWork: string;
  currentLearn: string;
  funFact: string;
  skills: string[];
  githubStats: boolean;
  streakStats: boolean;
  topLangs: boolean;
  visitorsCount: boolean;
  trophies: boolean;
}

export type Tab = "editor" | "preview" | "markdown";
