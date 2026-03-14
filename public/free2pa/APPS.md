# RadioHead Apps Handbook 🎸

## Overview

This workspace has a custom app system that runs under the `/apps/` route on the Railway deployment. Each app is a Node.js/Express server that gets proxied behind the main OpenClaw wrapper.

## App Location

All custom apps live in: `/data/workspace/apps/`

Each app is in its own subfolder and must have:
- `server.js` - Main application code
- `package.json` - Dependencies

## Apps Registry

Apps are registered in: `/data/workspace/.openclaw/apps.json`

```json
{
  "version": 1,
  "apps": [
    {
      "slug": "radiohead-dashboard",
      "name": "RadioHead Dashboard",
      "runtime": "node",
      "root": "apps/radiohead-dashboard",
      "startCommand": "node server.js"
    }
  ]
}
```

## Current Apps

### RadioHead Dashboard
- **URL:** `https://group-4-production-71a2.up.railway.app/apps/radiohead-dashboard/`
- **Purpose:** View/edit/download MD files and manage running apps
- **Routes:**
  - `/` - Main dashboard UI
  - `/api/read?path=...` - Read a file
  - `/api/write` - Write a file (POST)
  - `/download/*` - Download a file

## How to Make Changes

### 1. Edit the code
```bash
cd /data/workspace/apps/radiohead-dashboard
nano server.js  # or vim, code, etc.
```

### 2. Test locally
```bash
cd /data/workspace/apps/radiohead-dashboard
node server.js
# Access at localhost:3000 (or whatever port it binds to)
```

### 3. Deploy changes

**Option A: Restart via /apps page (RECOMMENDED)**
1. Go to: https://group-4-production-71a2.up.railway.app/apps
2. Find the app and click "Restart"

**Option B: Kill and let it auto-restart**
```bash
pkill -f "radiohead-dashboard"
# The Railway wrapper will auto-spawn a new process
```

### 4. Verify
Check the app is working at its URL.

## Common Issues

### "Address already in use" (EADDRINUSE)
Another process is already running on the port. Kill it first:
```bash
pkill -f "server.js"
# Then restart
```

### Internal Server Error on /apps page
- Check if the app syntax is valid: `node -c server.js`
- Check for runtime errors in logs
- Make sure all routes are properly defined

### Routes not working
The proxy strips `/apps/<slug>/` prefix before forwarding to the app. Inside the app code, use relative paths:
- Use `/api/read` NOT `/apps/radiohead-dashboard/api/read`
- Use `/download/` NOT `/apps/radiohead-dashboard/download/`

Exception: In HTML href/src attributes, use full paths:
- `<a href="/apps/radiohead-dashboard/download/...">`

## Adding a New App

1. Create folder in `/data/workspace/apps/`
2. Add `server.js` and `package.json`
3. Add entry to `/data/workspace/.openclaw/apps.json`
4. Deploy

## Important Notes

- The root `/` route is controlled by OpenClaw - never use `app.get('/')` for redirects, it causes infinite loops
- Always test syntax with `node -c server.js` before deploying
- Keep the apps.json registry updated
- Use absolute paths in HTML, relative paths in API calls

---

*Last updated: March 6, 2026*
