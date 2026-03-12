# TishantOS - Kali Linux Portfolio

A unique developer portfolio built as a fully interactive Kali Linux desktop environment in the browser. Visitors experience a realistic OS simulation complete with a boot sequence, lock screen, desktop, terminal, file manager, and more -- all themed around the iconic Kali Linux aesthetic.

## Features

- **Boot Screen** -- Authentic Kali Linux boot sequence animation on first load
- **Lock Screen** -- Password-protected lock screen with user avatar and clock
- **Desktop Environment** -- Draggable, resizable windows with a taskbar and system tray
- **Terminal Emulator** -- Functional terminal with custom commands to explore portfolio content
- **File Manager** -- Browse projects, resume, and other files in a familiar GUI
- **Application Launcher** -- Start menu / app grid for launching different portfolio sections
- **System Tray** -- Clock, battery indicator, network status, and other OS-style widgets
- **Responsive Design** -- Adapts across screen sizes while preserving the desktop metaphor
- **Smooth Animations** -- Polished transitions and effects throughout the experience

## Tech Stack

| Technology | Purpose |
|---|---|
| **React** | Component-based UI framework |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first styling |
| **Vite** | Lightning-fast build tool and dev server |
| **Lucide Icons** | Clean, consistent icon set |

## Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/tishant-portfolio.git
cd tishant-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dev server will start at `http://localhost:5173` by default.

## Hosting Plans

### a. Vercel (Recommended -- Easiest)

Vercel offers zero-config deployment for Vite projects with automatic HTTPS, preview deployments, and custom domain support.

**Option 1 -- Vercel CLI:**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from the project root
vercel
```

Follow the prompts to link your project. Subsequent deploys are a single `vercel` command away.

**Option 2 -- GitHub Integration:**

1. Push your code to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Vite and configures the build settings.
4. Every push to `main` triggers an automatic production deployment. Pull requests get their own preview URLs.

### b. Netlify

1. Push your code to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site > Import an existing project**.
3. Connect your GitHub repository.
4. Set the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**. Netlify will build and publish automatically on every push.

### c. GitHub Pages

```bash
# Install gh-pages as a dev dependency
npm install -D gh-pages
```

Add a deploy script to your `package.json`:

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

If your site will be served from a subpath (e.g., `https://username.github.io/tishant-portfolio/`), set the `base` option in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/tishant-portfolio/',
  // ...other config
})
```

Then build and deploy:

```bash
npm run build && npm run deploy
```

Your site will be available at `https://<username>.github.io/tishant-portfolio/`.

### d. Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) and sign in.
2. Click **Create a project > Connect to Git** and select your repository.
3. Set the build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**. Cloudflare Pages will build and deploy on every push, with free SSL and a global CDN.

### e. Custom VPS / Server

Build the production bundle locally (or in CI):

```bash
npm run build
```

This outputs a static site to the `dist/` directory. Upload or copy that folder to your server and serve it with any static file server. For example, with **nginx**:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/tishant-portfolio/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The `try_files` fallback to `index.html` ensures client-side routing works correctly.

## Recommended Approach

**Vercel** is the recommended hosting platform for this project. It provides zero-config deployment for Vite apps, automatic preview deployments for pull requests, built-in analytics, and seamless custom domain support -- all on a generous free tier. Simply connect your GitHub repo and every push is live within seconds.
