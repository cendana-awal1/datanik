# 📦 How to Install Dependencies

## Problem
You're getting error: "Failed to resolve import 'lucide-react'"

## Solution
You need to install npm packages that are listed in `package.json`

## Step 1: Open Terminal/Command Prompt
Navigate to your project folder:
```
cd D:\copilotdev\datanik
```

## Step 2: Install Dependencies
Run this command:
```
npm install
```

**This will install:**
- react & react-dom
- @supabase/supabase-js (database)
- lucide-react (icons)
- axios (HTTP client)
- TypeScript
- Vite
- ESLint
- And other build tools

**Time:** ~2-3 minutes (first time)

## Step 3: Wait for Installation
You should see:
```
added XXX packages
```

## Step 4: Run Development Server
```
npm run dev
```

Visit: http://localhost:5173

---

## Troubleshooting

### Error: "npm command not found"
- You need to install Node.js from https://nodejs.org
- Download and install LTS version
- Restart your terminal

### Error: "npm ERR!"
Try clearing cache and reinstalling:
```
npm cache clean --force
npm install
```

### Still having issues?
1. Delete folder: `node_modules`
2. Delete file: `package-lock.json`
3. Run: `npm install` again

---

## What's Next?

After `npm install` completes successfully:

1. Create `.env.local` with Supabase credentials
2. Run `npm run dev`
3. Visit http://localhost:5173
4. You should see the login page!

---

**If npm install works, everything will be installed and the error will be gone!**
