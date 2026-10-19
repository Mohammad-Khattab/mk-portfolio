export interface Repo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
}

export const REPOS: Repo[] = [
  { name: "Personal-OS-2", description: "MKHUB — a local-first personal dashboard for finance, tasks, notes, watchlists and subscriptions, with an encrypted password vault and optional Supabase sync (live on Vercel)", language: "JavaScript", stars: 0, url: "https://github.com/Mohammad-Khattab/Personal-OS-2" },
  { name: "coffee-house-template", description: "A bilingual (EN/AR) Next.js coffee shop landing page template — a demo/portfolio piece, not built for a real business", language: "TypeScript", stars: 0, url: "https://github.com/Mohammad-Khattab/coffee-house-template" },
  { name: "clinicbot", description: "A WhatsApp bot for clinic appointment booking, reminders, and follow-ups, using conversational AI and Google Sheets", language: "JavaScript", stars: 0, url: "https://github.com/Mohammad-Khattab/clinicbot" },
  { name: "portfolio-redesign", description: "An in-progress Next.js and React Three Fiber portfolio redesign with a WebGL hero, GSAP scroll animations, and an editorial design system", language: "TypeScript", stars: 0, url: "https://github.com/Mohammad-Khattab/portfolio-redesign" },
  { name: "snake-3d", description: "A 3D neon take on Snake built with Three.js — 9 maps, 20 campaign levels, 20 unlockable skins", language: "HTML", stars: 0, url: "https://github.com/Mohammad-Khattab/snake-3d" },
  { name: "mmkl-snake", description: "A browser-based Snake game with a Node.js backend, campaign progression, in-game currency, and cosmetic skins", language: "HTML", stars: 0, url: "https://github.com/Mohammad-Khattab/mmkl-snake" },
  { name: "mediconnect-telehealth-ui", description: "A bilingual (EN/AR) Next.js demo of a telehealth platform — booking, symptom checker, and patient portal", language: "TypeScript", stars: 0, url: "https://github.com/Mohammad-Khattab/mediconnect-telehealth-ui" },
  { name: "snakes-and-ladders", description: "A dark-fantasy-themed Snakes and Ladders board game for 2-4 players with AI opponents", language: "HTML", stars: 0, url: "https://github.com/Mohammad-Khattab/snakes-and-ladders" },
  { name: "mmkl-dashboard", description: "A personal animated HTML/CSS/JS dashboard for launching games, tools, and productivity links", language: "HTML", stars: 0, url: "https://github.com/Mohammad-Khattab/mmkl-dashboard" },
];
