/**
 * Central profile & site config.
 * Update personal details here — components read from this file.
 */
export const profile = {
  name: "Ali Hassan",
  firstName: "Ali",
  lastName: "Hassan",
  title: "DevOps Engineer",
  location: "Lahore, Pakistan",
  email: "hassanrajpoot4414@gmail.com",
  linkedin: "https://www.linkedin.com/in/alihassan4414",
  github: "https://github.com/hassanrajpoot14",
  resumeUrl: "/resume.pdf", // Place your resume PDF in /public/resume.pdf
  yearsExperience: "1.5+",
  openTo: "DevOps / SRE / Cloud Ops roles — remote or hybrid",
  tagline:
    "I keep production calm — Docker stacks, CI/CD pipelines, and hardened Nginx on real VPS infrastructure.",
  about: [
    "I'm a DevOps Engineer based in Lahore, remotely operating live production systems for Softex Solutions (Manhattan, Kansas, USA). My job is production reliability: containerized stacks, GitHub Actions pipelines, Nginx reverse proxies, and fast incident response when SSL, DNS, or resources go sideways.",
    "I care about systems that stay up, stay secure, and stay observable. From security audits to recommending monitoring stacks like Wazuh, Netdata, GoAccess, and CrowdSec, I bridge shipping features and running them confidently in production — with runbooks, not heroics.",
  ],
  status: {
    label: "systems.online",
    detail: "prod · healthy",
    uptime: "99.9%",
  },
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#impact", label: "Impact" },
  { href: "#skills", label: "Skills" },
  { href: "#approach", label: "Approach" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
] as const;
