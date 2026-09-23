/**
 * Certifications — lead with role-fit credentials.
 */
export type Certification = {
  id: string;
  title: string;
  issuer: string;
  status: "earned" | "in-progress";
  accent: "teal" | "lime" | "sky" | "amber" | "cyan";
  shortCode: string;
  featured?: boolean;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: "az-104",
    title: "AZ-104: Microsoft Azure Administrator",
    issuer: "Microsoft",
    status: "earned",
    accent: "sky",
    shortCode: "AZ-104",
    featured: true,
  },
  {
    id: "huawei-arch",
    title: "Huawei Cloud Solution Architecture — Advanced Level",
    issuer: "Huawei",
    status: "earned",
    accent: "teal",
    shortCode: "HCSA",
    featured: true,
  },
  {
    id: "rhcsa",
    title: "RHCSA (Red Hat Certified System Administrator)",
    issuer: "Red Hat",
    status: "in-progress",
    accent: "amber",
    shortCode: "RHCSA",
    featured: true,
  },
  {
    id: "html5-certiport",
    title: "HTML5 Application Development Fundamentals",
    issuer: "Certiport (A Pearson VUE Business)",
    status: "earned",
    accent: "lime",
    shortCode: "HTML5",
  },
  {
    id: "sql-sololearn",
    title: "Introduction to SQL",
    issuer: "Sololearn",
    status: "earned",
    accent: "cyan",
    shortCode: "SQL",
  },
];
