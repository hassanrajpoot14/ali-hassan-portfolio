# Ali Hassan — DevOps Engineer Portfolio

Personal portfolio for **Ali Hassan**, a DevOps Engineer based in Lahore, Pakistan. Built with Next.js and Tailwind CSS — content lives in data files so you can update experience, projects, and certifications without rewriting layout code.

**Live stack:** Docker · CI/CD · Nginx · Linux VPS (Hetzner / Contabo)

---

## Features

- Content-first architecture (`src/data/`)
- Dark / light mode (`next-themes`)
- Scroll reveals and motion (`framer-motion`)
- Sections: About, Impact, Skills, Approach, Experience, Projects, Certifications, Contact
- Docker + Nginx deploy option included
- GitHub Actions CI starter

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Icons | Lucide React |
| Deploy | Vercel (recommended) or Docker + Nginx |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update content

Edit files under `src/data/`:

| File | What it controls |
|------|------------------|
| `profile.ts` | Name, title, tagline, about, socials, status badge |
| `skills.ts` | Skill categories & proficiency |
| `experience.ts` | Timeline roles & responsibilities |
| `certifications.ts` | Certification badges |
| `projects.ts` | Project / case-study cards |
| `education.ts` | Degrees |
| `highlights.ts` | Impact highlights |
| `principles.ts` | Approach / principles |

**Assets**

- Resume PDF → `public/resume.pdf` (powers the Download Resume button)
- Portrait images → managed via `src/data/portraits.ts` and `public/`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Framework preset: **Next.js** — leave build settings default
4. Deploy

### Docker (VPS / self-host)

```bash
docker compose up --build
```

App + Nginx proxy → **http://localhost:8080**

Standalone image:

```bash
docker build -t ali-hassan-portfolio .
docker run --rm -p 3000:3000 ali-hassan-portfolio
```

CI starter: `.github/workflows/ci.yml`

## Contact

- **Email:** hassanrajpoot4414@gmail.com
- **LinkedIn:** [alihassan4414](https://www.linkedin.com/in/alihassan4414)
- **GitHub:** [hassanrajpoot14](https://github.com/hassanrajpoot14)
- **Location:** Lahore, Pakistan

## License

Personal portfolio — all rights reserved.
