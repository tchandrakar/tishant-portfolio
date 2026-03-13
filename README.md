# TishantOS - Kali Linux Portfolio

A unique developer portfolio built as a fully interactive Kali Linux desktop environment in the browser. Features a dual-portfolio system: a realistic OS simulation for developers, and a clean classic portfolio for everyone else.

**Live:** [tishant-portfolio.vercel.app](https://tishant-portfolio.vercel.app)

## Features

### Dual Portfolio Mode
Visitors choose between two experiences:
- **Kali Desktop** (for developers) -- Full OS simulation with boot sequence, lock screen, draggable windows, terminal, and file manager
- **Classic Portfolio** (for everyone) -- Clean, animated single-page portfolio with star background and scroll reveals

### Kali Desktop Mode
- **Boot Screen** -- Authentic Kali Linux boot sequence animation
- **Lock Screen** -- Password-protected lock screen with clock
- **Window Manager** -- Draggable, minimizable, maximizable windows with focus management
- **Terminal Emulator** -- Functional terminal with commands: `neofetch`, `help`, `skills`, `experience`, `projects`, `contact`, and more
- **File Manager** -- Virtual filesystem to browse projects, resume, and other files
- **Dock & System Tray** -- macOS-style dock with running app indicators, clock, and status icons
- **Context Menu** -- Right-click desktop menu for quick actions

### Classic Mode
- **Animated Star Background** -- Canvas-based star field with shooting stars
- **Scroll Reveal Animations** -- Sections animate in as you scroll (up, left, right directions)
- **Hero Section** -- Staggered text entrance animation
- **Responsive Design** -- Fully responsive across all screen sizes

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI framework |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS 3** | Utility-first styling |
| **Vite 8** | Build tool and dev server |
| **Lucide Icons** | Clean, consistent icon set |

## Using This Template

Want to use this as your own portfolio? Here's what to change:

### 1. Update Your Personal Data

All personal data lives in a single file: **`src/data/profile.ts`**

```typescript
// Update the PROFILE object with your details:
export const PROFILE = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your@email.com',
  phone: '+1-234-567-8900',
  location: 'Your City, Country',
  github: 'https://github.com/yourusername',
  linkedin: 'https://www.linkedin.com/in/yourusername/',
  resumeUrl: '/Your_Resume.pdf',       // Place PDF in /public
  education: {
    institution: 'Your University',
    degree: 'Your Degree',
    gpa: 'Your GPA',
    period: 'Start - End',
    location: 'City',
  },
  certifications: ['Cert 1', 'Cert 2'],
  achievements: ['Achievement 1', 'Achievement 2'],
  bio: 'Your bio text...',
};
```

### 2. Update Experiences

In the same file, edit the `EXPERIENCES` array:

```typescript
export const EXPERIENCES: Experience[] = [
  {
    company: 'Company Name',
    role: 'Your Role',
    location: 'City',
    period: 'Month Year - Present',
    highlights: [
      'What you accomplished...',
    ],
    techStack: ['Tech1', 'Tech2', 'Tech3'],
  },
  // Add more experiences...
];
```

### 3. Update Projects

Edit the `PROJECTS` array:

```typescript
export const PROJECTS: Project[] = [
  {
    name: 'Project Name',
    description: 'What it does...',
    tech: ['React', 'TypeScript'],
    github: 'https://github.com/you/project',
    url: 'https://live-demo.com',       // optional
  },
  // Add more projects...
];
```

### 4. Update Skills

Edit the `SKILLS` array -- each skill has a `level` from 0-100 that fills the progress bar:

```typescript
export const SKILLS: Skill[] = [
  {
    category: 'Languages',
    items: [
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 85 },
    ],
  },
  // Add more categories...
];
```

### 5. Update Boot Messages & Neofetch

Still in `profile.ts`, customize the terminal flavor:

- **`BOOT_MESSAGES`** -- Array of strings shown during the boot sequence. Customize the OS name, kernel version, and loaded modules.
- **`NEOFETCH_PLAIN`** -- The neofetch output shown in the terminal. Update the ASCII art info lines with your details.

### 6. Replace Resume PDF

Drop your resume PDF into the `/public` directory and update `PROFILE.resumeUrl` to match the filename:

```
public/
  Your_Resume.pdf      <-- your file
```

### 7. Update Favicon

Replace `public/favicon.svg` with your own.

### 8. Optional: Customize Theme Colors

Edit `tailwind.config.js` to change the Kali theme colors under `theme.extend.colors.kali`:

```javascript
kali: {
  bg: '#0d0d1a',        // Desktop background
  panel: '#1a1a2e',     // Panel/titlebar background
  accent: '#367bf0',    // Primary accent (buttons, links)
  // ...more colors
}
```

### 9. Optional: Customize Terminal Commands

Edit `src/components/Terminal.tsx` to add, remove, or modify terminal commands. Each command is a case in the `processCommand` function.

## Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server will start at `http://localhost:5173`.

## Project Structure

```
src/
  App.tsx                          # Root -- hash-based routing between modes
  data/profile.ts                  # All personal data (edit this!)
  types/index.ts                   # TypeScript interfaces
  hooks/
    useWindowManager.ts            # Window state management
    useScrollReveal.ts             # IntersectionObserver for scroll animations
  components/
    BootScreen.tsx                 # Kali boot sequence
    LockScreen.tsx                 # Lock screen
    TopBar.tsx                     # GNOME-style top bar
    Desktop.tsx                    # Desktop icons
    Dock.tsx                       # Bottom dock
    Window.tsx                     # Draggable window component
    Terminal.tsx                   # Terminal emulator
    FileManager.tsx                # Virtual file browser
    AboutMe.tsx                    # About section (Kali window)
    Projects.tsx                   # Projects section (Kali window)
    Skills.tsx                     # Skills section (Kali window)
    Contact.tsx                    # Contact form (Kali window)
    Resume.tsx                     # PDF-viewer style resume
    PortfolioChooser.tsx           # Landing page mode selector
    ContextMenu.tsx                # Right-click menu
    classic/
      ClassicPortfolio.tsx         # Full classic single-page portfolio
      ScrollReveal.tsx             # Scroll animation wrapper
      StarBackground.tsx           # Animated canvas star field
public/
  favicon.svg
  Tishant_Chandrakar_CV.pdf        # Resume PDF for download
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects Vite -- click Deploy
4. Every push to `main` auto-deploys

Or via CLI:

```bash
npm i -g vercel
vercel
```

### Netlify

1. Import repo at [app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages

```bash
npm install -D gh-pages
```

Add to `package.json`:
```json
{ "scripts": { "deploy": "gh-pages -d dist" } }
```

Set base path in `vite.config.ts` if using a subpath:
```typescript
export default defineConfig({ base: '/your-repo-name/' })
```

Then: `npm run build && npm run deploy`

## License

MIT
