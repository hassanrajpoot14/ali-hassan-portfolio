/**
 * How Ali operates — short principles that differentiate a reliability-minded engineer.
 */
export type Principle = {
  id: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    id: "boring-deploys",
    title: "Boring deploys win",
    body: "If a release needs heroics, the pipeline or the runbook is wrong. I aim for repeatable paths from commit to production.",
  },
  {
    id: "observe-first",
    title: "See it before users do",
    body: "Uptime without visibility is luck. I push for monitoring and logs that make SSL, DNS, and capacity issues obvious early.",
  },
  {
    id: "secure-edges",
    title: "Harden the edges",
    body: "Nginx, TLS, and host posture are not afterthoughts — they are the difference between a calm night and a 3am outage.",
  },
  {
    id: "document-pain",
    title: "Write the runbook once",
    body: "Recurring incidents deserve docs. I turn repeated fixes into short runbooks so the next response is faster and calmer.",
  },
];
