# Pluto.ai — AI Resume Analyzer & Builder

Pluto.ai is a comprehensive platform for optimizing your career profile. Analyze your existing resume with AI and build professional, ATS-ready resumes in minutes.

## Features

- **Resume Analyzer**: Upload your current resume and get detailed feedback, scoring, and AI-driven improvement suggestions.
- **Resume Builder**: Build a stunning, professional resume from scratch using beautiful, modern templates.

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Framework**: TanStack Start (SSR)
- **AI Integration**: OpenRouter (Claude 3.5 Sonnet)
- **Deployment**: Vercel

## Environment Setup

To run this project locally, you need an OpenRouter API key to enable the AI features.

1. Rename `.env.example` to `.env`.
2. Add your OpenRouter API key:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

## Development

```bash
npm install
npm run dev
```

## Deployment

The application is fully configured for zero-downtime deployment on Vercel. 
Ensure your `OPENROUTER_API_KEY` is added to your Vercel Environment Variables before deploying.

```bash
npm run build
```

---

*Made with ♥ by [Aman Rahangdale](http://www.linkedin.com/in/aman-rahangdale-58114929b)*
