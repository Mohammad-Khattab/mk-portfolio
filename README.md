# Mohammad Khattab — Portfolio

Personal portfolio built with [Astro](https://astro.build), documenting real, in-progress projects: a self-hosted homelab, an AI agent project, early electronics work, and the PC/site this runs on.

Static output, no client-side framework — plain Astro components with small inline scripts where interactivity is needed (nav scrolling, the timeline and milestones carousel on project pages, scroll-reveal animations).

## Structure

```
src/
  components/   Header, background decoration, scroll-reveal script
  data/         Real project, certificate, and contact data
  layouts/      Shared page shell
  pages/        index.astro (home) + projects/[id].astro (project detail)
  styles/       Single global stylesheet, design tokens as CSS custom properties
```

## Commands

| Command         | Action                              |
| :-------------- | :----------------------------------- |
| `npm install`   | Install dependencies                 |
| `npm run dev`   | Start the local dev server           |
| `npm run build` | Build the static site to `./dist/`   |
| `npm run preview` | Preview the production build       |
