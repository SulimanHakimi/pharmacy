---
description: Build and Deploy Pharmacy App to Vercel
---

## Prerequisites

- Ensure you have Node.js (v20 or later) installed.
- Install Vercel CLI globally: `npm i -g vercel`.
- Have a Vercel account and be logged in (`vercel login`).

## Steps

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run a production build**
   ```bash
   npm run build
   ```
3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```
   - If this is the first deployment, follow the prompts to link the project.
   - You can also specify a project name: `vercel --prod --name pharmacy-app`.

## Optional: Continuous Deployment

- Connect your GitHub repository to Vercel for automatic deployments on push.

// turbo-all
