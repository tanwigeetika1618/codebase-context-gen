# 🖥️ How to Run & Show the Demos — Master Guide

> This document covers how to run BOTH demos live.
> Location on your laptop: `~/Repos/demo-guides/HOW_TO_RUN_DEMOS.md`

---

## Table of Contents

1. [Demo 1: TS Mastery Hub (Office Hours / APAC EMEA)](#demo-1-ts-mastery-hub)
2. [Demo 2: Codebase Context Generator (Conference)](#demo-2-codebase-context-generator)

---

---

# Demo 1: TS Mastery Hub

**Repo:** https://github.com/tanwigeetika1618/ts-mastery-hub
**Web:** https://tanwigeetika1618.github.io/ts-mastery-hub/
**Best for:** Team Office Hours (Mondays), APAC EMEA calls (Tuesdays)
**Duration:** 12-15 minutes

---

## Pre-Demo Setup (10 minutes before the call)

### 1. Open Terminal

- Use **iTerm2** or the default macOS Terminal
- Make it **full screen** (Cmd+Enter on iTerm2)
- Increase font size to **16-18pt** (Cmd+Plus a few times)
- Ensure the background is **dark** (easier to read on screen share)

### 2. Prepare the Project

```bash
cd ~/Repos/ts-mastery-hub
npm install          # should say "up to date" if already done
npm run build        # build the CLI
npm run dev          # TEST IT — make sure the banner shows up
```

- When the menu appears, press **Ctrl+C** to exit
- Good — it works!

### 3. Open Browser Tabs (2 tabs, ready to switch)

- **Tab 1:** https://tanwigeetika1618.github.io/ts-mastery-hub/
- **Tab 2:** https://github.com/tanwigeetika1618/ts-mastery-hub

### 4. Share Screen

- Share your **full screen** (not a single window) — you'll switch between terminal and browser
- Or share just the terminal first, then switch to browser later

### 5. Have This Ready to Paste in Meeting Chat

```
🚀 TS Mastery Hub
📦 Repo: https://github.com/tanwigeetika1618/ts-mastery-hub
🌐 Website: https://tanwigeetika1618.github.io/ts-mastery-hub/

Quick start:
git clone https://github.com/tanwigeetika1618/ts-mastery-hub.git
cd ts-mastery-hub && npm install && npm run dev
```

---

## Live Demo Steps

### Step 1: Show the GitHub Repo (1 min)

1. **Switch to browser** → Tab 2 (GitHub repo)
2. Scroll the README slowly — show the project description, features list, and project structure
3. Don't linger — just give people a quick look

### Step 2: Launch the CLI (1 min)

1. **Switch to terminal**
2. Type and run:
   ```bash
   cd ~/Repos/ts-mastery-hub
   npm run dev
   ```
3. **Wait for the banner** — let it fully render before talking
4. The menu will appear with 7 options

### Step 3: Show Learning Paths (2 min)

1. Use **arrow keys** to highlight **📚 Learning Paths**
2. Press **Enter**
3. Select **TypeScript Foundations**
4. Press **Enter**
5. A table appears with 6 modules — let people read for 5 seconds
6. Press **Enter** to go back to the path selection
7. Select **← Back to main menu**

### Step 4: Do an Interactive Challenge (2-3 min) ⭐ MOST ENGAGING

1. Select **⚡ Quick Challenges**
2. Choose **Intermediate** (or **Random** for surprise)
3. A challenge appears with a code snippet and 4 options
4. **READ THE QUESTION ALOUD** to the audience
5. **ASK THE AUDIENCE**: "What do you think — A, B, C, or D?"
6. **Wait 10-15 seconds** for responses in chat
7. Select the answer (use arrow keys + Enter)
8. The correct answer + explanation appears
9. When it asks "Try another challenge?" → say **Yes** and do one more
10. After the second challenge → say **No** to go back

### Step 5: Show Cheat Sheets (1 min)

1. Select **📋 Cheat Sheets**
2. Choose **Utility Types**
3. Scroll through the cards (they appear one after another)
4. Press **Enter** to go back

### Step 6: Show the Roadmap (1 min)

1. Select **🗺️ Developer Roadmap**
2. A big ASCII art roadmap renders with 5 phases
3. Let people read it for 5 seconds
4. Select **← Back to main menu**

### Step 7: Flash Through Resources & Tips (1 min)

1. Select **🔗 Curated Resources** → pick **TypeScript Core** → show the URLs
2. Go back → Select **💡 Pro Tips & Patterns** → pick **Show all tips** → scroll through 1-2 tips
3. Go back to main menu

### Step 8: Show the Web Page (2 min)

1. Select **👋 Exit** from the CLI
2. **Switch to browser** → Tab 1 (the website)
3. Scroll slowly through the entire page:
   - Hero section with stats
   - Learning path cards
   - Visual roadmap
   - Cheat sheets with syntax highlighting
   - Resources section
   - CLI terminal mockup at the bottom
4. Done!

### Step 9: Show Runnable Examples (optional, 1 min)

If you have time, go back to terminal:
```bash
npx tsx examples/03-generics/generics.ts
```
This runs a real TypeScript example file and shows the output.

### Step 10: Wrap Up

1. Paste the links in the meeting chat (the text you prepared in step 5 of setup)
2. Tell people they can clone and run it themselves
3. Done! 🎉

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm run dev` fails | Run `npm install` first |
| Banner looks squished | Make terminal full screen (needs 80+ columns) |
| Font too small for screen share | Cmd+Plus (Mac) to zoom in |
| Website not loading | Open locally: `open docs/index.html` |
| Arrow keys not working | Click inside the terminal window first |

---

---

# Demo 2: Codebase Context Generator

**Repo:** https://github.com/tanwigeetika1618/codebase-context-gen
**Best for:** Conferences (DevConf, KubeCon, internal), APAC EMEA demo calls
**Duration:** 10-12 minutes

---

## Pre-Demo Setup (15 minutes before)

### 1. Prepare Repos to Analyze

You need 2-3 repos cloned locally. Suggestions:

```bash
# Your own TS Mastery Hub (already there)
ls ~/Repos/ts-mastery-hub

# Clone a popular open-source repo (do this BEFORE the demo)
cd /tmp && git clone --depth 1 https://github.com/honojs/hono.git

# Or clone your team's actual project (if internal demo)
```

### 2. Prepare Terminal

- Full screen, font size 16-18pt, dark background
- `cd ~/Repos/codebase-context-gen`

### 3. Test It Works

```bash
cd ~/Repos/codebase-context-gen
node dist/index.js ~/Repos/ts-mastery-hub
```

You should see the banner, spinners, and "✅ Context file generated!" box.

### 4. Prepare for the "Before vs After" Comparison

- Open **Cursor** or any AI tool in a separate window
- You'll use this to show the difference between asking AI WITHOUT the context file vs WITH it

### 5. Have This Ready to Paste in Chat

```
🧠 codebase-context-gen — Zero-token AI context generator
📦 Repo: https://github.com/tanwigeetika1618/codebase-context-gen

Try it:
git clone https://github.com/tanwigeetika1618/codebase-context-gen.git
cd codebase-context-gen && npm install
node dist/index.js /path/to/any/project
```

---

## Live Demo Steps

### Step 1: Set the Context — The Problem (2 min)

This is just talking — no screen action yet. Explain the problem.

### Step 2: Run It on a Small Repo (2 min)

1. **Terminal should be visible**
2. Type and run:
   ```bash
   cd ~/Repos/codebase-context-gen
   node dist/index.js ~/Repos/ts-mastery-hub
   ```
3. Watch the spinners run through 6 analyzers
4. The green result box appears — **pause and let people read it**
5. Point out: file size (~4.6 KB), tokens (~1,136), time (~2s), reduction (44x)

### Step 3: Show the Generated File (2 min)

1. Open the generated context file:
   ```bash
   cat ~/Repos/ts-mastery-hub/.ai-context.md
   ```
   Or open it in VS Code / Cursor for better readability:
   ```bash
   code ~/Repos/ts-mastery-hub/.ai-context.md
   ```
2. Scroll through the sections slowly:
   - File tree
   - Dependencies (categorized)
   - Config files detected
   - TypeScript exports with full signatures
   - Git history + hotspot files

### Step 4: Run It on a Big Repo — Show It Scales (1 min)

```bash
node dist/index.js /tmp/hono
```

This runs on the Hono web framework (500+ files). Show that it still finishes in ~2 seconds and generates a compact file.

### Step 5: The "Before vs After" Comparison (3 min) ⭐ KEY MOMENT

**Without context file:**
1. Open Cursor / Claude CLI
2. Open the ts-mastery-hub project
3. Ask: "Explain the architecture of this project and where the main entry point is"
4. Watch the AI read file after file — it explores, reads, explores more
5. Note: this costs ~50K+ tokens every time

**With context file:**
1. Start a new conversation
2. Attach `.ai-context.md` (in Cursor: type `@.ai-context.md`)
3. Ask the same question: "Explain the architecture of this project"
4. The AI answers **immediately** — it already has the full map
5. Point out: ~1,136 tokens total, same quality answer

### Step 6: Show the Flags/Options (30 sec)

```bash
node dist/index.js --help
```

Show the options: `--no-git`, `--no-types`, `--max-depth`, `-o`, `-v`

### Step 7: Wrap Up (1 min)

1. Paste the links in the meeting chat
2. Done! 🎉

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `ts-morph` slow on huge repo | Use `--no-types` to skip TypeScript analysis |
| No git data | Use `--no-git` for freshly cloned or non-git repos |
| Tree too long | Use `--max-depth 3` |
| "Command not found" | Use `node dist/index.js` not `ctx-gen` (unless globally installed) |

---

---

# Quick Reference: File Locations

| What | Path on Your Laptop |
|------|---------------------|
| **This guide** | `~/Repos/demo-guides/HOW_TO_RUN_DEMOS.md` |
| **Speaking points** | `~/Repos/demo-guides/SPEAKING_POINTS.md` |
| **TS Mastery Hub repo** | `~/Repos/ts-mastery-hub/` |
| **TS Mastery Hub demo guide** | `~/Repos/ts-mastery-hub/DEMO_GUIDE.md` |
| **Context Gen repo** | `~/Repos/codebase-context-gen/` |
| **Context Gen demo guide** | `~/Repos/codebase-context-gen/DEMO_GUIDE.md` |
| **TS Mastery Hub website** | https://tanwigeetika1618.github.io/ts-mastery-hub/ |
| **TS Mastery Hub GitHub** | https://github.com/tanwigeetika1618/ts-mastery-hub |
| **Context Gen GitHub** | https://github.com/tanwigeetika1618/codebase-context-gen |
