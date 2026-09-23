/**
 * Work experience — reverse chronological. Prefer outcomes over duty lists.
 */
export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  employmentType: string;
  period: string;
  current?: boolean;
  responsibilities: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "softex",
    role: "DevOps Engineer",
    company: "Softex Solutions",
    location: "Manhattan, Kansas, USA",
    employmentType: "Remote",
    period: "Current",
    current: true,
    responsibilities: [
      "Own day-to-day reliability for multiple live customer apps on Hetzner and Contabo VPS",
      "Keep Dockerized stacks reproducible so environments stay consistent from staging through production",
      "Build and remediate GitHub Actions pipelines so releases are predictable instead of fragile",
      "Configure and harden Nginx reverse proxies for TLS, performance, and safer exposure of services",
      "Lead incident response for outages, SSL/DNS failures, and resource exhaustion — restore service, then tighten the path that failed",
      "Run security-minded audits and recommend practical monitoring (Wazuh, Netdata, GoAccess, CrowdSec)",
    ],
  },
  {
    id: "dev-system",
    role: "System Administrator",
    company: "dev-system creation",
    location: "Lahore, Pakistan",
    employmentType: "On-site / Hybrid",
    period: "1 year",
    responsibilities: [
      "Administered Linux servers (RHEL/CentOS/Ubuntu) — access, packages, services, and baseline health",
      "Provisioned and maintained development and staging infrastructure teams could actually rely on",
      "Owned backups, patching, and capacity checks to reduce avoidable downtime",
      "Handled DNS, firewall rules, and reverse-proxy basics that sit under every web deploy",
      "Turned recurring incidents into short runbooks so the next fix was faster and less tribal-knowledge",
      "Partnered with developers to stabilize deployments and raise operational readiness before go-live",
    ],
  },
];
