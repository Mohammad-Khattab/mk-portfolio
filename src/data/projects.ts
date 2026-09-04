export interface Spec { k: string; v: string; }
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
  homelab: {
    id: "homelab",
    index: "01",
    kind: "Infrastructure",
    title: "Homelab",
    glyph: "🖥️",
    summary:
      "A 2-node Proxmox lab I'm building from the ground up to actually understand hypervisors, storage and networking — not just following a video. It blocks ads and adult content network-wide with Pi-hole, backs up photos through Immich, and surfaces everything through a Homepage dashboard; VPN, a second node, Jellyfin, a Minecraft server, and Home Assistant are still on the wishlist.",
    specs: [
      { k: "Role", v: "Design, build, ops" },
      { k: "Started", v: "2026" },
      { k: "Nodes", v: "2 — desktop + laptop" },
      { k: "Status", v: "Pi-hole, Immich, Homepage live" },
    ],
    stops: [
      {
        date: "2026",
        label: "First boot",
        teaser: "Proxmox on a repurposed i5-10400F desktop.",
        body: "The main node is an i5-10400F desktop (hostname mohammad-pve) with Proxmox VE 9.2.11 installed — my first real hands-on with a hypervisor instead of just reading about one.",
        notes: [
          "~15GB RAM, confirmed live over SSH",
          "Learning VMs vs. containers by actually running both",
          "Everything driven from the command line, no GUI shortcuts",
        ],
      },
      {
        date: "2026",
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
        date: "2026",
        label: "Ad-blocking, take one",
        teaser: "AdGuard Home as the first DNS filter.",
        body: "Stood up AdGuard Home as the network's first DNS-level ad blocker — the first real wishlist item checked off.",
        notes: [
          "First taste of running a service other people in the house actually depend on",
          "Wanted more than ad-blocking eventually: adult content too",
        ],
      },
      {
        date: "Sep 2026",
        label: "Pi-hole migration",
        teaser: "Full teardown, rebuilt on Pi-hole instead.",
        body: "We ran into some issues with parental controls and similar filtering on AdGuard, so I fully destroyed that container and rebuilt DNS filtering on Pi-hole instead, reusing the exact same static IP so nothing else on the network needed to change.",
        notes: [
          "~4.4 million domains loaded into gravity across ad, malware, tracking and adult-content lists",
          "Verified live: ad and adult domains resolve to 0.0.0.0, normal sites resolve fine",
          "Confirmed working from my phone by manually pointing its Wi-Fi DNS at the Pi-hole",
        ],
      },
      {
        date: "Now",
        label: "Immich + Homepage",
        teaser: "Self-hosted photo backup and a dashboard to find it all.",
        body: "Deployed Immich for photo and video backup — the real answer to the backup problem the striped hdd-pool created — plus Homepage as a single dashboard for finding and jumping into every service running on the node.",
        notes: [
          "Immich replaces ad-hoc phone-photo backups with something self-hosted",
          "Homepage is the first thing that opens when I need to check on the lab",
        ],
      },
      {
        date: "Next",
        label: "Second node & VPN",
        teaser: "Reverse proxy, backups, and remote access, still pending.",
        body: "The second node — an older laptop — isn't set up yet. Planned role is a reverse proxy plus a backup target for the main node's data. WireGuard is installed on the main node but not configured, and the router still isn't pointed at Pi-hole by default.",
        notes: [
          "Next: WireGuard VPN for remote access",
          "Next: router-wide DNS so filtering doesn't require manual per-device setup",
          "Still on the list: Jellyfin, a Minecraft server, Home Assistant",
        ],
      },
    ],
    slides: [
      { year: "2026", title: "First boot", tagline: "Proxmox on an i5-10400F desktop", tags: ["Proxmox VE"], body: "Installed the hypervisor on a repurposed desktop and started learning storage and networking by actually running them.", highlight: "First real hands-on hypervisor experience, not just reading about one." },
      { year: "2026", title: "Storage split", tagline: "ssd-pool (fast) + hdd-pool (bulk)", tags: ["ZFS"], body: "Split disks into a fast SSD pool for app state and a striped HDD pool for bulk data.", highlight: "Learned the hard way that striped means no redundancy." },
      { year: "2026", title: "AdGuard live", tagline: "First network-wide ad blocking", tags: ["AdGuard Home"], body: "Stood up DNS-level ad blocking for the whole network for the first time.", highlight: "First service other people in the house actually relied on." },
      { year: "Sep 2026", title: "Pi-hole migration", tagline: "Ads + parental controls, ~4.4M domains", tags: ["Pi-hole", "DNS"], body: "Tore down AdGuard and rebuilt filtering on Pi-hole after running into parental-control gaps, verified live via direct DNS queries.", highlight: "Migrated onto the exact same static IP so nothing else broke." },
      { year: "Now", title: "Immich + Homepage", tagline: "Photo backup and a service dashboard", tags: ["Immich", "Homepage"], body: "Deployed Immich for self-hosted photo and video backup and Homepage as a single dashboard for the lab's services.", highlight: "The first two user-facing apps running on top of the storage and DNS work." },
      { year: "Next", title: "VPN & node 2", tagline: "WireGuard + a reverse-proxy laptop", tags: ["WireGuard", "Planned"], body: "Configuring remote access and standing up the second node as a reverse proxy and backup target.", highlight: "The next concrete milestone, not yet done." },
    ],
    challenges: [
      { q: "Striped storage has no redundancy", a: "hdd-pool stripes two drives for capacity. If either one dies, everything on it is gone — fine for replaceable media, but that's exactly why photos now live behind Immich instead of just a folder on the striped pool. Immich itself still needs a real backup plan, since striping isn't redundancy." },
      { q: "AdGuard didn't cover parental controls well", a: "Rather than trying to bolt extra blocklists onto AdGuard, I fully destroyed the container and rebuilt DNS filtering on Pi-hole, which handled ad blocking and parental-control filtering cleanly in one place." },
      { q: "The router still doesn't know Pi-hole exists", a: "I don't have admin access to the router yet, so filtering only applies to devices I've manually pointed at the Pi-hole IP — getting the whole network covered automatically is still open." },
    ],
    codeFile: "proxmox/storage-setup.sh",
    code: "# fast tier — VM/container state\nzpool create ssd-pool /dev/sda\n\n# bulk tier — striped for capacity, no redundancy\nzpool create hdd-pool /dev/sdb /dev/sdd\nzfs set compression=lz4 hdd-pool\n\n# cap ARC so it doesn't starve VMs\necho \"options zfs zfs_arc_max=4294967296\" \\\n  > /etc/modprobe.d/zfs.conf",
    stack: [
      { k: "Hypervisor", v: "Proxmox VE 9.2.11" },
      { k: "Storage", v: "ZFS — ssd-pool + hdd-pool" },
      { k: "DNS", v: "Pi-hole v6, ~4.4M domains blocked" },
      { k: "Photos", v: "Immich" },
      { k: "Dashboard", v: "Homepage" },
      { k: "Next", v: "WireGuard VPN, reverse-proxy node" },
    ],
  },
  jarvis: {
    id: "jarvis",
    index: "02",
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
    index: "03",
    kind: "Hardware",
    title: "Bench",
    glyph: "💡",
    summary:
      "Where I started with physical electronics: an Arduino Uno, a breadboard, and a handful of small projects that taught me the basics before I touch anything bigger.",
    specs: [
      { k: "Role", v: "Circuits, code" },
      { k: "Board", v: "Arduino Uno" },
      { k: "Started", v: "2026" },
      { k: "Status", v: "Learning fundamentals" },
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
        teaser: "A microphone sensor controlling a bulb.",
        body: "Wired a microphone/sound sensor to control a bulb: one clap turns it on, three claps turn it off — the first project that reacts to something in the room instead of running on a fixed timer.",
        notes: [
          "First use of a sensor as input rather than just driving outputs",
          "Had to distinguish between one clap and three, not just detect sound",
        ],
      },
    ],
    slides: [
      { year: "2026", title: "Blinking lights", tagline: "First Arduino sketch", tags: ["Arduino Uno", "LED"], body: "A single LED blinking on a breadboard — the classic starting point for digital output.", highlight: "First real hands-on with a microcontroller." },
      { year: "2026", title: "Fade + buzzer", tagline: "PWM output and sound", tags: ["PWM", "Buzzer"], body: "Added PWM fading to the LED and a buzzer for basic sound output.", highlight: "First step past simple on/off control." },
      { year: "Now", title: "Clap-controlled light", tagline: "Mic sensor drives a bulb", tags: ["Sensor", "Sound"], body: "One clap turns the bulb on, three claps turn it off — the first project driven by a sensor instead of a timer.", highlight: "First project that reacts to the room instead of running on a fixed loop." },
    ],
    challenges: [
      { q: "Telling one clap from three reliably", a: "Had to work out sensor sensitivity and a timing window so the circuit could actually count claps instead of just reacting to any loud noise." },
      { q: "Going from blinking an LED to reacting to input", a: "The first two projects were pure output; the clap sensor was the first time input from the room had to drive a decision, which meant thinking in terms of state instead of a fixed sequence." },
    ],
    codeFile: "bench/clap_control.ino",
    code: "// Clap-controlled bulb: 1 clap = on, 3 claps = off\nint clapCount = 0;\nunsigned long lastClap = 0;\n\nvoid loop() {\n  if (analogRead(MIC_PIN) > THRESHOLD) {\n    if (millis() - lastClap < CLAP_WINDOW_MS) clapCount++;\n    else clapCount = 1;\n    lastClap = millis();\n\n    if (clapCount == 1) digitalWrite(BULB_PIN, HIGH);\n    if (clapCount == 3) { digitalWrite(BULB_PIN, LOW); clapCount = 0; }\n  }\n}",
    stack: [
      { k: "Board", v: "Arduino Uno" },
      { k: "Sensor", v: "Sound / microphone module" },
      { k: "Output", v: "LED, buzzer, relay-driven bulb" },
      { k: "Status", v: "3 small projects done" },
    ],
  },
  rig: {
    id: "rig",
    index: "04",
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
        body: "Currently building this portfolio itself: an Astro rebuild of a Modernist design spec, filled in with real project data instead of the original placeholder content.",
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
      { year: "Now", title: "This portfolio", tagline: "Astro, static, real content", tags: ["Astro", "This site"], body: "Rebuilding a Modernist design spec into a real, statically-generated site with real project data.", highlight: "The build sheet and the debugging logs became the site's actual content." },
    ],
    challenges: [
      { q: "Three RGB apps fighting for control", a: "SignalRGB, TRCC and RGB Fusion all tried to own the same lighting at once. Settled on one and reinstalled Gigabyte Control Center to stop the conflicts." },
      { q: "PSU died two months in", a: "The original Cooler Master MWE 750 V3 Gold failed outright. Replaced it with a Thermaltake Tough Power GT White unit and stress-tested across Valorant, Apex Legends and Minecraft to confirm it actually fixed things." },
      { q: "Color calibration was off out of the box", a: "Had to manually calibrate the display rather than trust factory defaults, on top of tuning the fan curve for noise versus temperatures." },
    ],
    codeFile: "src/data/projects.ts",
    code: "// this file — real project data, generated once\n// and edited by hand from here on, not templated\nexport const PROJECTS: Record<string, Project> = {\n  homelab: { /* Proxmox + Pi-hole, real */ },\n  jarvis:  { /* Claude API, Phase 2, real */ },\n  bench:   { /* Arduino Uno projects, real */ },\n  rig:     { /* this build + this site, real */ },\n};",
    stack: [
      { k: "CPU", v: "AMD Ryzen 5 9600X" },
      { k: "GPU", v: "Sapphire NITRO+ RX 9060 XT" },
      { k: "Motherboard", v: "Gigabyte B860M Gaming" },
      { k: "Cooling", v: "Thermalright Peerless Vision 360 AIO" },
    ],
  },
};

export const ORDER = ["homelab", "jarvis", "bench", "rig"];
