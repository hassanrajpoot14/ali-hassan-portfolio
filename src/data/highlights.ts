/**
 * Proof points hiring managers scan in under 5 seconds.
 * Keep numbers honest — prefer ranges and qualitative truth over fake precision.
 */
export type Highlight = {
  id: string;
  value: string;
  label: string;
  detail: string;
};

export const highlights: Highlight[] = [
  {
    id: "prod",
    value: "Live prod",
    label: "Customer apps",
    detail: "Operating real workloads on Hetzner & Contabo VPS",
  },
  {
    id: "stack",
    value: "Docker → Nginx",
    label: "Release path",
    detail: "Containerized stacks with hardened reverse proxies",
  },
  {
    id: "response",
    value: "Fast MTTR",
    label: "Incidents",
    detail: "SSL, DNS, and resource exhaustion triage under pressure",
  },
  {
    id: "focus",
    value: "1.5+ yrs",
    label: "In the seat",
    detail: "From sysadmin foundations to remote production DevOps",
  },
];
