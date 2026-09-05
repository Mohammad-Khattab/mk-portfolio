export interface Certificate {
  year: string;
  title: string;
  issuer: string;
  status: string;
  url?: string;
  image?: string;
}

export const CERTIFICATES: Certificate[] = [
  { year: "Aug 2026", title: "AI Fluency Framework & Foundations", issuer: "Anthropic", status: "Credential →", url: "https://verify.skilljar.com/c/o7mymsv6joab", image: "/certificates/ai-fluency-framework-foundations.jpg" },
  { year: "Aug 2026", title: "Introduction to Claude Cowork", issuer: "Anthropic", status: "Credential →", url: "https://verify.skilljar.com/c/o5mrktie38xq", image: "/certificates/intro-claude-cowork.jpg" },
  { year: "Aug 2026", title: "Claude Platform 101", issuer: "Anthropic", status: "Credential →", url: "https://verify.skilljar.com/c/f8q8eynj98xa", image: "/certificates/claude-platform-101.jpg" },
  { year: "Aug 2026", title: "Claude Code in Action", issuer: "Anthropic", status: "Credential →", url: "https://verify.skilljar.com/c/3w6eywpnoxsf", image: "/certificates/claude-code-in-action.jpg" },
  { year: "Aug 2026", title: "Claude Code 101", issuer: "Anthropic", status: "Credential →", url: "https://verify.skilljar.com/c/uhags73bvmzi", image: "/certificates/claude-code-101.jpg" },
  { year: "Aug 2026", title: "Claude 101", issuer: "Anthropic", status: "Credential →", url: "https://verify.skilljar.com/c/ije7ynmrtcvb", image: "/certificates/claude-101.jpg" },
  { year: "Apr 2026", title: "Project Initiation: Starting a Successful Project", issuer: "Google (Coursera)", status: "Credential →", url: "https://www.coursera.org/account/accomplishments/records/L4EIX9MUX4N9", image: "/certificates/project-initiation.jpeg" },
  { year: "Apr 2026", title: "Gemini Certified University Student", issuer: "Google For Education", status: "Credential →", url: "https://edu.google.accredible.com/d25411a1-4ee4-4643-b5c4-781cd351b041", image: "/certificates/gemini-certified-university-student.jpg" },
  { year: "Feb 2026", title: "Foundations of Project Management", issuer: "Google (Coursera)", status: "Credential →", url: "https://www.coursera.org/account/accomplishments/records/BAVV1Y32TIXH", image: "/certificates/foundations-project-management.jpeg" },
];
