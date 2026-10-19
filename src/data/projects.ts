export interface Spec { k: string; v: string; href?: string; }
export interface Stop { date: string; label: string; teaser: string; body: string; notes: string[]; }
export interface Slide { year: string; title: string; tagline: string; tags: string[]; body: string; highlight: string; }
export interface Challenge { q: string; a: string; }

export interface Project {
  id: string;
  index: string;
  kind: string;
  title: string;
  glyph: string;
  summary: string;
  specs: Spec[];
  stops: Stop[];
  slides: Slide[];
  challenges: Challenge[];
  codeFile: string;
  code: string;
  stack: Spec[];
}

export const PROJECTS: Record<string, Project> = {
  harakeh: {
    id: "harakeh",
    index: "01",
    kind: "Web App",
    title: "Harakeh",
    glyph: "🧭",
    summary:
      "A live English/Arabic city guide that helps people in Amman find things to do — cafés, padel, karting, escape rooms and more — filtered by budget, across 106 real places on a live map. Sign in with Google to keep a Saved list. It runs on Cloudflare Workers with Supabase and Clerk, and passed a security review with no critical or high-risk findings.",
    specs: [
      { k: "Role", v: "Design, build, deploy" },
      { k: "Started", v: "Sep 2026" },
      { k: "Live", v: "harakeh.mkll.me", href: "https://harakeh.mkll.me" },
      { k: "Status", v: "Live — 106 places" },
    ],
    stops: [
      {
        date: "Sep 2026",
        label: "Real places",
        teaser: "Placeholder data out, real Amman venues in.",
        body: "Started by replacing placeholder content with 45 real Amman venues, then grew the catalogue to 106 places across sports, food and drink, entertainment, outdoors and workshops. Every place carries opening hours, a starting price, coordinates, and its text in both English and Arabic.",
        notes: [
          "One data file is the single source for every screen",
          "A validation script checks the catalogue before anything ships",
          "Budget filter works off real starting prices, not categories",
        ],
      },
      {
        date: "Sep 2026",
        label: "Live map",
        teaser: "Every place on a MapLibre map.",
        body: "Split the app into one module per concern and added a Map tab built on MapLibre GL, with custom pins per activity and the user's location as an optional extra rather than a requirement.",
        notes: [
          "Fixed iOS and iPad sizing bugs in the map view",
          "Location is asked for from a tap, with clear steps if it was blocked",
          "In-app browsers (where location can't work) are detected and explained",
        ],
      },
      {
        date: "Sep 2026",
        label: "Accounts + Saved",
        teaser: "Google sign-in and a saved-places API.",
        body: "Added sign-in through Clerk with Google, and a Saved list backed by a small API on the Cloudflare Worker that reads and writes Supabase Postgres. Every query is scoped to the signed-in user, row-level security is on, and requests are rate-limited through Upstash Redis.",
        notes: [
          "Saved API runs at the edge on the same Worker that serves the app",
          "Secrets live in the Worker's runtime settings, never in the repo",
          "Account deletion cleans up the user's saved rows through a webhook",
        ],
      },
      {
        date: "Sep 2026",
        label: "Security review",
        teaser: "0 critical, 0 high.",
        body: "Ran a full security review before launch: no critical or high-risk findings. Then fixed the remaining findings: rate limiting now runs before authentication, unknown API routes return 404 without touching the auth provider, and provider error messages no longer reach the logs.",
        notes: [
          "Full git history scanned — no secret ever committed",
          "No IDOR: every database query is filtered by the user's id",
          "Consistent output escaping and strict security headers on every response",
        ],
      },
      {
        date: "19 Sep 2026",
        label: "Launch",
        teaser: "Own domain, production auth.",
        body: "Launched on harakeh.mkll.me with a production Clerk instance and my own Google OAuth credentials. The old workers.dev address now permanently redirects to the real domain. The desktop and right-to-left Arabic layouts were rebuilt properly, and the privacy policy and terms exist in both languages.",
        notes: [
          "Push to master deploys automatically through Cloudflare Workers Builds",
          "No analytics of any kind, as the privacy policy states",
          "Arabic direction is inherited from the document, using logical CSS properties",
        ],
      },
      {
        date: "Now",
        label: "Tester feedback",
        teaser: "Fixing what real users hit.",
        body: "Testers are using it, and their bug reports drive the work: a map pill covering the place card, accidental zoom on taps, the keyboard hiding filter options, and iOS Safari asking for location again on every visit — all fixed.",
        notes: [
          "Next: draw the 106 map pins as a MapLibre symbol layer instead of DOM elements, to remove map lag",
        ],
      },
    ],
    slides: [
      { year: "Sep 2026", title: "Real places", tagline: "45 venues, then 106", tags: ["Data"], body: "Replaced placeholder content with real Amman venues, each with hours, starting prices, coordinates and Arabic text.", highlight: "One validated data file feeds every screen." },
      { year: "Sep 2026", title: "Live map", tagline: "MapLibre GL, custom pins", tags: ["MapLibre", "JavaScript"], body: "Added a live map with per-activity pins and optional location.", highlight: "Location is an extra, never a gate." },
      { year: "Sep 2026", title: "Accounts + Saved", tagline: "Clerk, Supabase, Upstash", tags: ["Auth", "Postgres"], body: "Google sign-in plus a saved-places API on the Worker, backed by Postgres with row-level security and rate limiting.", highlight: "Every query scoped to the signed-in user." },
      { year: "Sep 2026", title: "Security review", tagline: "0 critical / 0 high", tags: ["Security"], body: "Audited before launch and fixed every medium finding: rate limiting before auth, a route allow-list, no leaked error details.", highlight: "Full git history scanned clean." },
      { year: "19 Sep 2026", title: "Launch", tagline: "harakeh.mkll.me", tags: ["Cloudflare", "Live"], body: "Custom domain, production Clerk instance, own Google OAuth credentials, and a redirect from the old address.", highlight: "Auto-deploys on every push to master." },
      { year: "Now", title: "Tester feedback", tagline: "Real testers, real bugs", tags: ["Iteration"], body: "Fixing the issues real testers report, from map overlaps to iOS location prompts.", highlight: "Next up: map performance with a symbol layer." },
    ],
    challenges: [
      { q: "The Saved list returned 503 in production", a: "Three separate causes stacked up: secrets had been set in the build settings instead of the Worker's runtime settings, a transposed Supabase project reference triggered Cloudflare error 1016, and a new Supabase project hadn't granted table privileges to the service role. Each fix is now written into the config or the migration." },
      { q: "Account deletion silently never ran", a: "The webhook library's v2 verify() only validates and returns nothing, but the handler read its return value, so every user-deleted event crashed and retried into the same crash. The handler now parses the body itself after verifying, and a regression test pins that behaviour." },
      { q: "\"I can't sign in\" after launch", a: "Instead of guessing, I tailed the Worker's live logs: the requests were arriving on the old workers.dev address from a saved bookmark, which the production auth provider doesn't trust. A permanent redirect to the real domain fixed it for everyone." },
    ],
    codeFile: "functions/api/[[path]].js (condensed)",
    code: "// unknown routes never reach the auth provider\nif (!ALLOWED_ROUTES.some((r) => r.test(pathname))) {\n  return json({ error: \"Not found.\" }, 404);\n}\n\n// rate-limit by IP *before* authenticating\nconst limited = await enforceIpLimit(env, request, \"auth\");\nif (limited) return limited;\n\nconst userId = await authenticate(request, env);\nif (!userId) return json({ error: \"Unauthorized.\" }, 401);\n\n// every query below is scoped to this user\nreturn saved(request, env, userId);",
    stack: [
      { k: "Frontend", v: "JavaScript, MapLibre GL" },
      { k: "Edge", v: "Cloudflare Workers" },
      { k: "Auth", v: "Clerk, Google sign-in" },
      { k: "Data", v: "Supabase Postgres, row-level security" },
      { k: "Rate limit", v: "Upstash Redis" },
      { k: "Deploy", v: "Push to master → Workers Builds" },
    ],
  },
  homelab: {
    id: "homelab",
    index: "02",
    kind: "Infrastructure",
    title: "Homelab",
    glyph: "🖥️",
    summary:
      "A Proxmox server I built from the ground up to actually understand hypervisors, storage and networking. It now runs 12+ self-hosted services across 11 isolated containers — DNS filtering, photo backup, a password manager, automation, monitoring with phone alerts — reachable from anywhere through Tailscale with zero ports open to the internet and a default-deny firewall in front of everything.",
    specs: [
      { k: "Role", v: "Design, build, ops" },
      { k: "Started", v: "Aug 2026" },
      { k: "Nodes", v: "1 live — laptop node pending" },
      { k: "Status", v: "12+ services live" },
    ],
    stops: [
      {
        date: "Aug 2026",
        label: "First boot",
        teaser: "Proxmox on a repurposed i5-10400F desktop.",
        body: "The main node is an i5-10400F desktop (hostname mohammad-pve) running Proxmox VE 9 — my first real hands-on with a hypervisor instead of just reading about one.",
        notes: [
          "~15GB RAM, managed over SSH",
          "Learning VMs vs. containers by actually running both",
          "Everything driven from the command line, no GUI shortcuts",
        ],
      },
      {
        date: "Aug 2026",
        label: "Storage layout",
        teaser: "Two ZFS pools, split by job.",
        body: "Split the node's disks into two ZFS pools: a fast SSD pool for VM and container state (the \"brains\" of services), and a striped HDD pool for bulk data like media and files. Some of that storage didn't come from a store — I stripped an SSD and a 2.5\" HDD out of an old laptop and installed them straight into the node.",
        notes: [
          "ssd-pool — fast tier for app databases and container disks",
          "hdd-pool — two drives striped for capacity, ~1.35TB usable",
          "The SSD and one of the hdd-pool drives were salvaged from a dead laptop instead of bought new",
          "Striped means no redundancy — fine for replaceable media, not for anything I can't lose",
        ],
      },
      {
        date: "Sep 2026",
        label: "DNS filtering",
        teaser: "AdGuard first, then a rebuild on Pi-hole.",
        body: "Started with AdGuard Home as the network's DNS-level ad blocker. It didn't handle parental-control filtering well, so I fully destroyed that container and rebuilt DNS filtering on Pi-hole, reusing the exact same static IP so nothing else on the network needed to change.",
        notes: [
          "~4.4 million domains loaded across ad, malware, tracking and adult-content lists",
          "Verified live: blocked domains resolve to 0.0.0.0, normal sites resolve fine",
          "First service other people in the house actually depend on",
        ],
      },
      {
        date: "Sep 2026",
        label: "Immich + Homepage",
        teaser: "Self-hosted photo backup and a dashboard.",
        body: "Deployed Immich for photo and video backup, plus Homepage as a single dashboard for every service — including a Security Checks panel fed by a script that reports host health and security posture every 5 minutes.",
        notes: [
          "Immich replaces ad-hoc phone-photo backups with something self-hosted",
          "Grafana and InfluxDB run alongside for metrics",
          "Dashboard secrets moved out of config files into protected env files",
        ],
      },
      {
        date: "Sep 2026",
        label: "Remote access + HTTPS",
        teaser: "Tailscale, Caddy, Vaultwarden.",
        body: "Remote access went live through Tailscale instead of a hand-built WireGuard setup: the server is a subnet router, so any of my devices reaches every service by its normal LAN address, with Pi-hole filtering applied remotely too. Caddy became the reverse proxy with friendly .lan names, and Vaultwarden (a self-hosted password manager) gets a real Let's Encrypt certificate through a Cloudflare DNS-01 challenge — with no public DNS record at all.",
        notes: [
          "Zero router ports forwarded — nothing is exposed to the public internet",
          "Cloudflare token scoped to DNS edits on one domain only, kept out of the logs",
          "Vaultwarden backed up automatically every night to a second location",
        ],
      },
      {
        date: "Sep 2026",
        label: "Hardening + monitoring",
        teaser: "Default-deny firewall, uptime alerts.",
        body: "Turned on the Proxmox firewall with a default-deny inbound policy and per-container allow-lists, so each app only accepts traffic from the proxy and the dashboard. Uptime Kuma runs 15 uptime checks across the lab (plus Harakeh) and alerts my phone through Telegram; Diun sends a Telegram message when any app has a new release.",
        notes: [
          "Key-only SSH on the AI dev container",
          "Unused services disabled, host fully updated, first ZFS scrub run",
          "Every app updated with snapshots taken first as rollback points",
        ],
      },
      {
        date: "Now",
        label: "Automation + tools",
        teaser: "n8n, remote AI agents, file drop, inventory.",
        body: "The lab now hosts n8n (which runs my Telegram assistant), an always-on container with Claude Code and Codex that I control from my phone and keep in sync with my PC through Syncthing, a Samba drop share for moving files between devices, and Homebox for tracking what I own and where it's stored.",
        notes: [
          "AI agents get a scoped helper that can only check, start or stop approved containers",
          "A one-click shutdown button, restricted to the LAN and tailnet",
          "Each new service gets a firewall rule, a reverse-proxy name and an uptime check",
        ],
      },
      {
        date: "Next",
        label: "Second node",
        teaser: "Backup target and redundancy.",
        body: "The second node — an older laptop — still needs its Proxmox install. Its planned role is a replication target for the main node's data, which matters because photos currently live on a single machine. The router also still isn't pointed at Pi-hole, so filtering covers only devices I've configured by hand or that connect over Tailscale.",
        notes: [
          "Next: zfs send/receive replication to the laptop node",
          "Next: router-wide DNS so every device in the house is covered",
          "Still on the list: a Minecraft server",
        ],
      },
    ],
    slides: [
      { year: "Aug 2026", title: "First boot", tagline: "Proxmox on an i5-10400F desktop", tags: ["Proxmox VE"], body: "Installed the hypervisor on a repurposed desktop and started learning storage and networking by actually running them.", highlight: "First real hands-on hypervisor experience, not just reading about one." },
      { year: "Aug 2026", title: "Storage split", tagline: "ssd-pool (fast) + hdd-pool (bulk)", tags: ["ZFS"], body: "Split disks into a fast SSD pool for app state and a striped HDD pool for bulk data.", highlight: "Learned the hard way that striped means no redundancy." },
      { year: "Sep 2026", title: "DNS filtering", tagline: "AdGuard → Pi-hole, ~4.4M domains", tags: ["Pi-hole", "DNS"], body: "Tore down AdGuard and rebuilt filtering on Pi-hole after running into parental-control gaps, verified live via direct DNS queries.", highlight: "Migrated onto the exact same static IP so nothing else broke." },
      { year: "Sep 2026", title: "Immich + Homepage", tagline: "Photo backup and a service dashboard", tags: ["Immich", "Homepage"], body: "Deployed Immich for self-hosted photo and video backup and Homepage as a single dashboard with live security checks.", highlight: "The first user-facing apps on top of the storage and DNS work." },
      { year: "Sep 2026", title: "Remote access", tagline: "Tailscale subnet router, Caddy, HTTPS", tags: ["Tailscale", "Caddy"], body: "Every service reachable from anywhere through Tailscale, behind a Caddy reverse proxy with Let's Encrypt certificates via DNS-01.", highlight: "Zero ports open to the internet." },
      { year: "Sep 2026", title: "Hardening", tagline: "Default-deny firewall, 15 uptime checks", tags: ["Firewall", "Uptime Kuma"], body: "Per-container allow-lists, uptime monitoring and update notifications, all alerting to my phone over Telegram.", highlight: "A service going down reaches my phone over Telegram." },
      { year: "Now", title: "Automation + tools", tagline: "n8n, remote AI agents, Homebox", tags: ["n8n", "Syncthing"], body: "n8n for automation, an always-on Claude Code and Codex container, a file drop share, and a home inventory.", highlight: "12+ services, each with its own firewall rule and uptime check." },
      { year: "Next", title: "Second node", tagline: "Replication target for the main node", tags: ["ZFS", "Planned"], body: "Setting up the laptop node as a backup target so photos aren't on a single machine.", highlight: "The next concrete milestone, not yet done." },
    ],
    challenges: [
      { q: "Tailscale broke DNS inside every container", a: "Tailscale rewrote the host's resolver to its own MagicDNS address, and Proxmox copies the host's resolver into containers that don't set one — so Immich, Grafana and Homepage all lost name resolution. Fixed by pinning each container to Pi-hole and stopping Tailscale from managing the host's DNS." },
      { q: "A status script failed silently for days", a: "The security-checks script worked when run by hand but failed under cron, because cron's PATH didn't include the Proxmox tools. The dashboard kept showing stale data with no error. One PATH line fixed it, and now I verify cron jobs under cron, not just in my shell." },
      { q: "A service raced the network at boot", a: "The remote-control service for the AI dev container started before the network was ready, failed once, and never retried. It now waits for DNS to resolve before starting and restarts on failure." },
      { q: "Striped storage has no redundancy", a: "hdd-pool stripes two drives for capacity, so losing either one loses everything on it. That's acceptable for replaceable media but not for photos — which is exactly why replicating to the second node is the next milestone." },
    ],
    codeFile: "proxmox/storage-setup.sh",
    code: "# fast tier — VM/container state\nzpool create ssd-pool /dev/sda\n\n# bulk tier — striped for capacity, no redundancy\nzpool create hdd-pool /dev/sdb /dev/sdd\nzfs set compression=lz4 hdd-pool\n\n# cap ARC so it doesn't starve VMs\necho \"options zfs zfs_arc_max=4294967296\" \\\n  > /etc/modprobe.d/zfs.conf",
    stack: [
      { k: "Hypervisor", v: "Proxmox VE 9, LXC, Docker" },
      { k: "Storage", v: "ZFS — ssd-pool + hdd-pool" },
      { k: "Network", v: "Tailscale subnet router, 0 open ports" },
      { k: "Proxy", v: "Caddy, Let's Encrypt via DNS-01" },
      { k: "DNS", v: "Pi-hole v6, ~4.4M domains blocked" },
      { k: "Apps", v: "Immich, Vaultwarden, n8n, Homepage, Grafana, Homebox" },
      { k: "Monitoring", v: "Uptime Kuma, Diun → Telegram" },
    ],
  },
  assistant: {
    id: "assistant",
    index: "03",
    kind: "AI Automation",
    title: "Assistant",
    glyph: "💬",
    summary:
      "A private Telegram assistant that runs on my homelab. It answers questions about my schedule and courses, messages me 10 minutes before every lecture with a recap of where the last one stopped, and can search my university email read-only. The rule it's built on: code decides the facts, the AI only writes the words — and every reply is checked against the source data.",
    specs: [
      { k: "Role", v: "Design, build, ops" },
      { k: "Started", v: "Sep 2026" },
      { k: "Runs on", v: "Homelab — n8n + Claude Code" },
      { k: "Status", v: "Live, in daily use" },
    ],
    stops: [
      {
        date: "Sep 2026",
        label: "n8n on the homelab",
        teaser: "Automation without a paid API key.",
        body: "Stood up n8n in its own container behind the reverse proxy, firewalled so only the proxy and dashboard can reach it. Instead of a paid API key, n8n reaches Claude Code in the AI dev container over SSH, using a key that only works from n8n's address and can't open a shell session.",
        notes: [
          "Uses my existing Claude subscription through the Claude Code CLI",
          "The dev container accepts key-only SSH",
          "Workflows are exported, edited and re-imported as files",
        ],
      },
      {
        date: "Sep 2026",
        label: "Facts in code",
        teaser: "The AI missed 1 event in 8 — so it stopped deciding.",
        body: "The first version let the model read my schedule, and it dropped an event once in eight runs. I redesigned it: plain Python parses my timetable and deadlines, the model only turns that list into a friendly reply, and the script checks that every event title made it into the answer before sending it.",
        notes: [
          "If a title is missing, it retries with Codex, then sends the plain list with a warning",
          "When nothing is scheduled, a fixed message goes out with no AI call at all",
          "Same rule everywhere since: code decides the facts, the AI writes the words",
        ],
      },
      {
        date: "Sep 2026",
        label: "Telegram bot",
        teaser: "Polling, one allowed user, least privilege.",
        body: "Connected it to a Telegram bot that answers only me. It polls Telegram rather than using a webhook, because nothing on the homelab is exposed to the internet. Commands cover the next hour, today, tomorrow and the week; free text goes to a general assistant that can read my project notes and read or edit my uni and personal notes — and nothing else.",
        notes: [
          "No shell access and no delete — enforced by Claude Code's permission layer, verified by testing",
          "Private notes, credentials and system files are blocked even if asked directly",
          "Messages are marked as received before the slow AI step, so overlapping polls can't answer twice",
        ],
      },
      {
        date: "Oct 2026",
        label: "Lecture reminders",
        teaser: "10 minutes before class, with a recap.",
        body: "An n8n workflow checks my timetable during university hours and sends a reminder 10 minutes before each lecture, with the course's week topics and a recap of the previous lecture. Code picks which slides were covered from a progress log I update by message; the model only writes 3–4 bullets about them, with slide titles as the fallback.",
        notes: [
          "Course info (instructor, office hours, grading) written up from the syllabuses",
          "Slides converted to text so the recap can name what was covered",
          "Each workflow node carries a note explaining what it does",
        ],
      },
      {
        date: "Oct 2026",
        label: "Uni email, read-only",
        teaser: "Search and read — nothing else.",
        body: "My university account doesn't allow app passwords, so instead of IMAP the assistant reaches Gmail through an MCP connector. Only the search and read tools are allowed; every write tool — send, reply, forward, draft, delete, label — is explicitly denied. Email access only switches on when my message is actually about email.",
        notes: [
          "Verified: asking it to send an email is refused",
          "Fixed a race where the connector wasn't ready on about 2 of 3 runs",
          "Tool list trimmed to keep each question's token cost down",
        ],
      },
      {
        date: "Now",
        label: "Daily use",
        teaser: "Reminders, alerts and questions, every day.",
        body: "It's in daily use. The same bot also carries gym reminders generated from a single plan file, and the homelab's uptime and update alerts. Next on the list is a morning brief.",
        notes: [
          "Gym reminders at 4 pm and 7 pm, read from one editable plan file",
          "Uptime Kuma and Diun alerts arrive through the same bot",
        ],
      },
    ],
    slides: [
      { year: "Sep 2026", title: "n8n on the homelab", tagline: "Automation, subscription not API key", tags: ["n8n", "SSH"], body: "n8n in its own firewalled container, reaching Claude Code over a locked-down SSH key.", highlight: "No paid API key, nothing exposed to the internet." },
      { year: "Sep 2026", title: "Facts in code", tagline: "Code decides, the AI writes", tags: ["Python", "Claude"], body: "Moved every fact into plain Python after the model dropped an event once in eight runs; replies are checked before sending.", highlight: "Fallbacks: Claude → Codex → plain list." },
      { year: "Sep 2026", title: "Telegram bot", tagline: "One user, least privilege", tags: ["Telegram", "Permissions"], body: "Answers only me, reads only the folders it's allowed to, and cannot delete or run shell commands.", highlight: "Permissions verified by trying to break them." },
      { year: "Oct 2026", title: "Lecture reminders", tagline: "10 minutes before each class", tags: ["n8n", "Haiku"], body: "Reminders with week topics and a recap of where the last lecture stopped.", highlight: "Code picks the slides; the model writes the bullets." },
      { year: "Oct 2026", title: "Read-only email", tagline: "Gmail through MCP", tags: ["MCP", "Gmail"], body: "Search and read only — every write tool explicitly denied.", highlight: "Asking it to send an email is refused." },
      { year: "Now", title: "Daily use", tagline: "Reminders, alerts, questions", tags: ["Live"], body: "In daily use, also carrying gym reminders and homelab alerts.", highlight: "Next: a morning brief." },
    ],
    challenges: [
      { q: "The AI dropped an event 1 time in 8", a: "Letting the model read the schedule itself meant it occasionally left things out. Now plain code builds the list, the model only words it, and the script checks every title appears in the reply — falling back to Codex, then to the plain list, if anything is missing." },
      { q: "Overlapping polls answered the same message twice", a: "n8n polls every 30 seconds, but a Claude reply can take longer than that, so the next poll saw the same message. Marking messages as received before the slow AI step fixed it." },
      { q: "University email has no app passwords", a: "The uni disabled 2-Step Verification, so IMAP app passwords weren't an option. I used a Gmail MCP connector instead, locked to read-only tools, and forced it to finish connecting before each run after it raced and missed about 2 runs in 3." },
    ],
    codeFile: "bin/uni-ask (condensed)",
    code: "# code decides the facts, the AI only writes the words\nevents = agenda(window)            # parsed from timetable.md\nif not events:\n    return \"Nothing scheduled.\"    # no AI call at all\n\nfor writer in (claude_haiku, codex):\n    reply = writer(prompt(events, question))\n    # every real event title must survive into the reply\n    if reply and all(norm(e.title) in norm(reply) for e in events):\n        return reply\n\nreturn plain_list(events) + \"\\n(AI unavailable, raw list)\"",
    stack: [
      { k: "Orchestration", v: "n8n, self-hosted" },
      { k: "Writer", v: "Claude Haiku / Sonnet via Claude Code CLI" },
      { k: "Facts", v: "Python, Bash" },
      { k: "Fallback", v: "Codex CLI → plain list" },
      { k: "Interface", v: "Telegram Bot API, polling" },
      { k: "Email", v: "Gmail via MCP, read-only" },
    ],
  },
  jarvis: {
    id: "jarvis",
    index: "04",
    kind: "Agents",
    title: "Jarvis",
    glyph: "🤖",
    summary:
      "A personal \"second brain\" agent — the goal is something that knows my context, talks back by voice, and can act across my own systems. Right now it's Phase 2: cleaning personal data and wiring it into the Claude API, built by directing an AI system rather than hand-writing everything myself.",
    specs: [
      { k: "Role", v: "Architecture, direction" },
      { k: "Started", v: "2026" },
      { k: "Model", v: "Claude API" },
      { k: "Phase", v: "2 — data + API wiring" },
    ],
    stops: [
      {
        date: "2026",
        label: "The idea",
        teaser: "An agent that knows me, not the internet.",
        body: "Decided Jarvis should be more than a chatbot: something that knows my context, has access to my own data and systems, talks back by voice, and can take actions — not just answer questions.",
        notes: [
          "About 90% of the code is expected to be AI-written",
          "The focus is on understanding and directing the system, not memorizing syntax",
        ],
      },
      {
        date: "2026",
        label: "Synthetic data",
        teaser: "Practicing on fake data before real data.",
        body: "Had Claude generate a synthetic life-log dataset to practice on, so I could break the cleaning pipeline without touching anything real first.",
        notes: [
          "Lower stakes for learning pandas fundamentals",
          "A safe place to make mistakes before Jarvis sees real personal data",
        ],
      },
      {
        date: "2026",
        label: "Data cleaning",
        teaser: "pandas, real script errors, real debugging.",
        body: "Cleaned the synthetic dataset in pandas, working through actual errors in data_cleaning.py rather than following a script blindly. Picked up Power Query and pivot tables in Excel along the way as part of the same prep work.",
        notes: [
          "Debugging pandas errors one at a time, not restarting from scratch",
          "Excel Power Query and pivot tables picked up as a side effect",
        ],
      },
      {
        date: "Now",
        label: "Claude API wiring",
        teaser: "Finishing data cleaning, then Anthropic Academy.",
        body: "Current phase: finish cleaning the data, then work through Anthropic Academy courses, then wire the cleaned data into real Claude API calls.",
        notes: [
          "Roadmap: data cleaning → Anthropic Academy → wire up Jarvis → deploy",
          "No voice interface or real actions yet — that comes after the core loop works",
        ],
      },
      {
        date: "Later",
        label: "Deployment",
        teaser: "AWS, but only once it's a real problem.",
        body: "Deliberately not moving to AWS or any cloud deployment preemptively — only once deployment becomes a concrete, real problem rather than something to build ahead of need.",
        notes: [
          "Avoiding premature infrastructure",
          "Voice interface and system actions are later-stage goals, not current scope",
        ],
      },
    ],
    slides: [
      { year: "2026", title: "The idea", tagline: "An agent that knows my context", tags: ["Claude API"], body: "Defined Jarvis as something that knows my data and systems and can act, not just chat.", highlight: "Learning AI/software fundamentals by building, not by tutorial." },
      { year: "2026", title: "Synthetic data", tagline: "Practice data before real data", tags: ["Pandas"], body: "Had Claude generate a fake life-log dataset to safely practice cleaning pipelines on.", highlight: "A safe place to break things before real personal data was involved." },
      { year: "2026", title: "Data cleaning", tagline: "Real pandas errors, real debugging", tags: ["Pandas", "Excel"], body: "Worked through actual script errors in data_cleaning.py, picking up Power Query and pivot tables along the way.", highlight: "~90% AI-written code — the point is directing it, not memorizing syntax." },
      { year: "Now", title: "API wiring", tagline: "Claude API integration, Phase 2", tags: ["Claude API", "In progress"], body: "Finishing data cleaning before moving on to Anthropic Academy courses and real API wiring.", highlight: "Current, active phase of the project." },
      { year: "Later", title: "Deployment", tagline: "AWS — only when actually needed", tags: ["Planned"], body: "Deliberately deferring cloud deployment until it's a concrete problem, not before.", highlight: "No premature infrastructure." },
    ],
    challenges: [
      { q: "Didn't know where to start with an AI agent", a: "Decided to learn by building instead of by tutorial — most of the code is AI-written, and my job is understanding and directing the system rather than memorizing syntax." },
      { q: "Real personal data felt risky to experiment on", a: "Had Claude generate a synthetic life-log dataset first, so the cleaning pipeline could be broken and fixed without touching anything real." },
      { q: "pandas errors kept stalling the cleaning script", a: "Worked through data_cleaning.py's errors one at a time instead of restarting — that debugging loop is most of what \"Phase 2\" has actually been so far." },
    ],
    codeFile: "jarvis/data_cleaning.py",
    code: "# Phase 2 — cleaning a synthetic life-log dataset\n# before any real personal data touches the pipeline\nimport pandas as pd\n\ndf = pd.read_csv(\"synthetic_life_log.csv\")\ndf = df.dropna(subset=[\"timestamp\", \"event\"])\ndf[\"timestamp\"] = pd.to_datetime(df[\"timestamp\"])\ndf = df.sort_values(\"timestamp\").reset_index(drop=True)\n\n# next: feed the cleaned frame into Claude API calls",
    stack: [
      { k: "Reasoning", v: "Claude API (Phase 2 integration)" },
      { k: "Data", v: "Pandas, synthetic life-log dataset" },
      { k: "Learning", v: "Anthropic Academy (next)" },
      { k: "Deploy", v: "AWS — only when it's a real problem" },
    ],
  },
  bench: {
    id: "bench",
    index: "05",
    kind: "Hardware",
    title: "Bench",
    glyph: "💡",
    summary:
      "Where I started with physical electronics: an Arduino Uno, a breadboard, and a handful of small projects that taught me the basics — ending, so far, in a clap-pattern controller that's the first step toward a hands-free trigger for my assistant.",
    specs: [
      { k: "Role", v: "Circuits, code" },
      { k: "Board", v: "Arduino Uno" },
      { k: "Started", v: "2026" },
      { k: "Status", v: "Clap controller working" },
    ],
    stops: [
      {
        date: "2026",
        label: "Blinking lights",
        teaser: "The classic first sketch.",
        body: "Started with the obvious first project: a single LED blinking on a breadboard, wired to an Arduino Uno — the usual starting point for learning digital output.",
        notes: [
          "First real hands-on with a microcontroller instead of just software",
          "Basics of digitalWrite and timing with delay()",
        ],
      },
      {
        date: "2026",
        label: "Fading + buzzer",
        teaser: "Analog output and sound.",
        body: "Moved on to PWM-based fading on the LED, and added a buzzer for sound — the first step past simple on/off into analog-style output and basic audio.",
        notes: [
          "PWM fading instead of hard on/off",
          "First time driving a buzzer alongside an LED",
        ],
      },
      {
        date: "Now",
        label: "Clap control",
        teaser: "Three claps on, two claps off.",
        body: "Wired a sound-sensor module to the Uno so clap patterns control a light: three claps turn it on, two claps turn it off. The module only reports sound or silence (1 or 0), so I tuned its sensitivity with the onboard potentiometer and counted the claps in code.",
        notes: [
          "First use of a sensor as input rather than just driving outputs",
          "Had to tell a pattern of three from a pattern of two, not just detect noise",
          "The kit mic detects loudness only — no words",
        ],
      },
      {
        date: "Next",
        label: "Clap → PC",
        teaser: "Serial link to a Python listener.",
        body: "Next step: when the light turns on, the Uno sends a line over USB serial, and a small Python listener on my PC launches Wallpaper Engine and my RGB lighting — the first physical trigger for my AI assistant.",
        notes: [
          "The Uno has no Wi-Fi or Bluetooth, so USB serial is the link",
          "The listener runs the actions directly instead of calling an AI per clap, which would be too slow",
        ],
      },
    ],
    slides: [
      { year: "2026", title: "Blinking lights", tagline: "First Arduino sketch", tags: ["Arduino Uno", "LED"], body: "A single LED blinking on a breadboard — the classic starting point for digital output.", highlight: "First real hands-on with a microcontroller." },
      { year: "2026", title: "Fade + buzzer", tagline: "PWM output and sound", tags: ["PWM", "Buzzer"], body: "Added PWM fading to the LED and a buzzer for basic sound output.", highlight: "First step past simple on/off control." },
      { year: "Now", title: "Clap control", tagline: "3 claps on, 2 claps off", tags: ["Sensor", "Sound"], body: "Three claps turn the light on and two turn it off, with the sensor's sensitivity tuned by hand.", highlight: "First project that reacts to the room instead of running on a fixed loop." },
      { year: "Next", title: "Clap → PC", tagline: "USB serial + Python listener", tags: ["Serial", "Planned"], body: "The Uno signals the PC over serial, and a Python listener starts the desk setup.", highlight: "The first physical trigger for the assistant." },
    ],
    challenges: [
      { q: "Telling three claps from two reliably", a: "The module only outputs sound or silence, so the work was in tuning its potentiometer until normal room noise didn't count, then using a timing window in code so the Uno counts a whole pattern before acting on it." },
      { q: "Going from blinking an LED to reacting to input", a: "The first two projects were pure output; the clap sensor was the first time input from the room had to drive a decision, which meant thinking in terms of state instead of a fixed sequence." },
    ],
    codeFile: "bench/clap_control.ino (condensed)",
    code: "// Clap pattern: 3 claps = on, 2 claps = off\nint clapCount = 0;\nunsigned long lastClap = 0;\n\nvoid loop() {\n  // sensor module outputs HIGH on sound, LOW on silence\n  if (digitalRead(MIC_PIN) == HIGH && millis() - lastClap > DEBOUNCE_MS) {\n    clapCount++;\n    lastClap = millis();\n  }\n  // the pattern ends once the room goes quiet\n  if (clapCount > 0 && millis() - lastClap > CLAP_WINDOW_MS) {\n    if (clapCount == 3) digitalWrite(LED_PIN, HIGH);\n    if (clapCount == 2) digitalWrite(LED_PIN, LOW);\n    clapCount = 0;\n  }\n}",
    stack: [
      { k: "Board", v: "Arduino Uno" },
      { k: "Sensor", v: "Sound module, digital output" },
      { k: "Output", v: "LED, buzzer" },
      { k: "Next", v: "USB serial → Python listener" },
    ],
  },
  rig: {
    id: "rig",
    index: "06",
    kind: "Rig & Web",
    title: "Rig & Web",
    glyph: "🌐",
    summary:
      "The machine everything else runs on, and the site you're reading. An all-black mATX build I put together and had to troubleshoot my way through, plus a portfolio built to document all of it — this page included.",
    specs: [
      { k: "Role", v: "Build, troubleshoot, publish" },
      { k: "Built", v: "June 2026" },
      { k: "CPU / GPU", v: "Ryzen 5 9600X / RX 9060 XT" },
      { k: "This site", v: "Astro, static" },
    ],
    stops: [
      {
        date: "Jun 2026",
        label: "Parts & build",
        teaser: "An all-black mATX build.",
        body: "Put together an all-black mATX build: a Ryzen 5 9600X on a Gigabyte B860M Gaming motherboard, a Sapphire NITRO+ RX 9060 XT, 32GB of RAM, all inside a Thermalright TL-M10 VISION case with a 360mm AIO.",
        notes: [
          "CPU: AMD Ryzen 5 9600X",
          "GPU: Sapphire NITRO+ RX 9060 XT",
          "Motherboard: Gigabyte B860M Gaming",
        ],
      },
      {
        date: "Jun 2026",
        label: "RGB chaos",
        teaser: "Three RGB apps fighting each other.",
        body: "SignalRGB, TRCC and RGB Fusion all tried to control the same lighting at once, on top of Thermalright LCD screen issues. Reinstalled Gigabyte Control Center and tuned the fan curves to settle it down.",
        notes: [
          "Settled on one RGB app instead of running all three",
          "Fan curves tuned manually rather than left on defaults",
        ],
      },
      {
        date: "~Aug 2026",
        label: "PSU failure",
        teaser: "The original PSU died two months in.",
        body: "The original Cooler Master MWE 750 V3 Gold failed outright about two months after the build. Replaced it with a Thermaltake Tough Power GT White unit from Oriental Store in Amman.",
        notes: [
          "Original PSU: Cooler Master MWE 750 V3 Gold",
          "Replacement: Thermaltake Tough Power GT White",
        ],
      },
      {
        date: "~Aug 2026",
        label: "Stress testing",
        teaser: "Confirming the fix actually held.",
        body: "After the PSU swap, ran stress tests across Valorant, Apex Legends and Minecraft to confirm the new unit and cooling setup actually held up under real, sustained load — not just idle.",
        notes: [
          "Real games, not synthetic-only benchmarks",
          "Also recalibrated display color rather than trusting factory defaults",
        ],
      },
      {
        date: "Now",
        label: "This site",
        teaser: "Rebuilding a design spec into a real site.",
        body: "This portfolio itself: an Astro rebuild of a Modernist design spec, filled in with real project data instead of placeholder content, live at portfolio.mkll.me and updated as each project moves.",
        notes: [
          "No client framework — static Astro output, in the spirit of the rest of this rig",
          "Content pulled from real project history instead of invented copy",
        ],
      },
    ],
    slides: [
      { year: "Jun 2026", title: "Parts & build", tagline: "All-black mATX, Ryzen 5 9600X", tags: ["Build"], body: "Assembled an all-black mATX build around a Ryzen 5 9600X and RX 9060 XT.", highlight: "Every part chosen and logged before the build started." },
      { year: "Jun 2026", title: "RGB chaos", tagline: "Three apps, one set of LEDs", tags: ["Troubleshooting"], body: "SignalRGB, TRCC and RGB Fusion fought for control until settling on one and reinstalling Gigabyte Control Center.", highlight: "Fixed by simplifying, not by adding more software." },
      { year: "Aug 2026", title: "PSU failure", tagline: "Cooler Master MWE 750 → Thermaltake GT", tags: ["Repair"], body: "The original PSU died about two months in; replaced with a Thermaltake Tough Power GT White unit.", highlight: "Diagnosed and fixed a full hardware failure, not just a software glitch." },
      { year: "Aug 2026", title: "Stress testing", tagline: "Valorant, Apex, Minecraft", tags: ["Validation"], body: "Confirmed the PSU swap and cooling held up under sustained real-world gaming load.", highlight: "Validated the fix instead of assuming it worked." },
      { year: "Now", title: "This portfolio", tagline: "Astro, static, real content", tags: ["Astro", "This site"], body: "A Modernist design spec rebuilt as a real, statically-generated site with real project data.", highlight: "The build sheet and the debugging logs became the site's actual content." },
    ],
    challenges: [
      { q: "Three RGB apps fighting for control", a: "SignalRGB, TRCC and RGB Fusion all tried to own the same lighting at once. Settled on one and reinstalled Gigabyte Control Center to stop the conflicts." },
      { q: "PSU died two months in", a: "The original Cooler Master MWE 750 V3 Gold failed outright. Replaced it with a Thermaltake Tough Power GT White unit and stress-tested across Valorant, Apex Legends and Minecraft to confirm it actually fixed things." },
      { q: "Color calibration was off out of the box", a: "Had to manually calibrate the display rather than trust factory defaults, on top of tuning the fan curve for noise versus temperatures." },
    ],
    codeFile: "src/data/projects.ts",
    code: "// this file — real project data, generated once\n// and edited by hand from here on, not templated\nexport const PROJECTS: Record<string, Project> = {\n  harakeh:   { /* live city guide, real */ },\n  homelab:   { /* Proxmox, 12+ services, real */ },\n  assistant: { /* n8n + Claude, in daily use */ },\n  jarvis:    { /* Claude API, Phase 2, real */ },\n  bench:     { /* Arduino Uno projects, real */ },\n  rig:       { /* this build + this site, real */ },\n};",
    stack: [
      { k: "CPU", v: "AMD Ryzen 5 9600X" },
      { k: "GPU", v: "Sapphire NITRO+ RX 9060 XT" },
      { k: "Motherboard", v: "Gigabyte B860M Gaming" },
      { k: "Cooling", v: "Thermalright Peerless Vision 360 AIO" },
    ],
  },
};

export const ORDER = ["harakeh", "homelab", "assistant", "jarvis", "bench", "rig"];
