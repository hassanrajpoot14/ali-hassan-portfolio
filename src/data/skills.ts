/**
 * Skills — edit categories/items here; Skills section renders them automatically.
 */
export type SkillItem = {
  name: string;
  level: number; // 0–100 visual proficiency
};

export type SkillCategory = {
  id: string;
  title: string;
  icon: "container" | "server" | "cicd" | "cloud" | "hosting" | "os" | "security";
  skills: SkillItem[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "containers",
    title: "Containers & Runtime",
    icon: "container",
    skills: [
      { name: "Docker", level: 90 },
      { name: "Docker Compose", level: 88 },
      { name: "Kubernetes", level: 75 },
    ],
  },
  {
    id: "proxy",
    title: "Edge & Proxy",
    icon: "server",
    skills: [
      { name: "Nginx", level: 88 },
      { name: "TLS / SSL", level: 86 },
      { name: "DNS", level: 82 },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & Automation",
    icon: "cicd",
    skills: [
      { name: "GitHub Actions", level: 85 },
      { name: "Git", level: 88 },
      { name: "Bash / Shell", level: 84 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Platforms",
    icon: "cloud",
    skills: [
      { name: "Microsoft Azure", level: 78 },
      { name: "Huawei Cloud", level: 82 },
      { name: "AWS", level: 70 },
    ],
  },
  {
    id: "hosting",
    title: "Infrastructure Hosting",
    icon: "hosting",
    skills: [
      { name: "Hetzner", level: 88 },
      { name: "Contabo VPS", level: 86 },
    ],
  },
  {
    id: "os",
    title: "Operating Systems",
    icon: "os",
    skills: [
      { name: "Linux (RHEL / CentOS / Ubuntu)", level: 90 },
      { name: "Backups & Patching", level: 84 },
    ],
  },
  {
    id: "security",
    title: "Observability & Security",
    icon: "security",
    skills: [
      { name: "Incident Response", level: 88 },
      { name: "Security Hardening", level: 85 },
      { name: "Netdata", level: 80 },
      { name: "Wazuh", level: 72 },
    ],
  },
];
