/**
 * Education — reverse chronological. Compact cards; quieter than Experience.
 */
export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  location?: string;
};

export const education: EducationItem[] = [
  {
    id: "bs-se",
    degree: "BS Software Engineering",
    institution: "Superior University",
    location: "Lahore, Pakistan",
  },
  {
    id: "fsc",
    degree: "FSc (Pre-Medical)",
    institution: "Superior College",
    location: "Lahore, Pakistan",
  },
  {
    id: "matric",
    degree: "Matric",
    institution: "BISE Faisalabad",
    location: "Faisalabad, Pakistan",
  },
];
