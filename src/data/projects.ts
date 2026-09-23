/**
 * Production case studies — anonymized client infra from real roles.
 * Prefer outcomes over tool lists. Keep claims honest.
 */
export type Project = {
  id: string;
  title: string;
  context: string;
  summary: string;
  problem: string;
  outcome: string;
  tech: string[];
  accent: "teal" | "lime" | "sky" | "amber" | "cyan";
  githubUrl?: string;
  liveUrl?: string;
  status: "placeholder" | "published";
};

export const projects: Project[] = [
  {
    id: "prod-docker-nginx",
    title: "Multi-app production on VPS",
    context: "Softex Solutions · live customer apps",
    summary:
      "Operate Dockerized web stacks across Hetzner and Contabo — reproducible environments, hardened Nginx edges, and calm release paths.",
    problem:
      "Multiple customer apps needed stable hosting without snowflake servers or risky manual deploys.",
    outcome:
      "Repeatable container stacks behind Nginx reverse proxies, with clearer rollouts and faster recovery when SSL, DNS, or resources fail.",
    tech: ["Docker", "Nginx", "Linux", "Hetzner", "Contabo"],
    accent: "teal",
    status: "published",
  },
  {
    id: "gha-cicd",
    title: "GitHub Actions release pipelines",
    context: "Softex Solutions · CI/CD reliability",
    summary:
      "Build and remediate CI/CD so shipping to production is boring — checks first, then a predictable path to the servers that actually serve users.",
    problem:
      "Fragile or incomplete pipelines made releases slow and easy to break under pressure.",
    outcome:
      "Actionable GitHub Actions flows for build/deploy hygiene, fewer surprise failures, and a clearer path from merge to production.",
    tech: ["GitHub Actions", "CI/CD", "Docker", "Linux"],
    accent: "lime",
    status: "published",
  },
  {
    id: "obs-security",
    title: "Observability & hardening audits",
    context: "Production reliability · security posture",
    summary:
      "Audit live systems, recommend monitoring that operators will actually use, and harden the edges that attackers and outages hit first.",
    problem:
      "Outages and risk were hard to see early — SSL/DNS issues and resource exhaustion showed up as user-facing pain.",
    outcome:
      "Practical monitoring recommendations (Wazuh, Netdata, GoAccess, CrowdSec) plus hardening notes that improve incident response readiness.",
    tech: ["Wazuh", "Netdata", "CrowdSec", "Nginx", "Linux"],
    accent: "sky",
    status: "published",
  },
];
