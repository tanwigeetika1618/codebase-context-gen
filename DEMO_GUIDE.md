# 🎤 codebase-context-gen — Conference Demo Guide

> **Step-by-step instructions for demoing at conferences or team calls.**
> Total demo time: ~10-12 minutes.

---

## 📋 Pre-Demo Setup

- [ ] Have 2-3 repos cloned locally to analyze (pick repos your audience knows):
  - A mid-size open source repo (e.g., `express`, `hono`, or a team project)
  - Your own `ts-mastery-hub` repo
  - Optionally: the audience's own team repo (if internal demo)
- [ ] Terminal font size 16+, dark background
- [ ] `cd ~/Repos/codebase-context-gen`
- [ ] Test it works: `node dist/index.js ~/Repos/ts-mastery-hub`
- [ ] Have a Cursor/Claude window open to show the "before vs after" comparison

---

## 🎬 The Demo

---

### STEP 1: The Problem (2 minutes)

**🗣️ What to say:**

> "How many of you use AI to help understand a new codebase? Whether it's Cursor, Claude, Codex, or ChatGPT — show of hands."
>
> *(pause for hands)*
>
> "And how many of you have noticed it burns through a LOT of tokens doing it? The AI reads file after file, explores the structure, tries to figure out where things are. And it does this EVERY time — every new conversation, every new team member."
>
> "If you're on an enterprise plan with a monthly budget — like we are at Red Hat — that adds up fast. I was burning through $300 in 12 days."
>
> "So I thought: what if we could give the AI a MAP of the codebase BEFORE it starts? Not using AI — using plain old static analysis. Parse the code, extract the structure, done."

---

### STEP 2: Run It Live (2 minutes)

**🖥️ What to do:**
```bash
cd ~/Repos/codebase-context-gen
node dist/index.js ~/Repos/ts-mastery-hub
```

**🗣️ What to say:**

> "Let me show you. One command..."
>
> *(command runs, spinners appear)*
>
> "It's running 6 analyzers — file structure, dependencies, configuration, TypeScript AST parsing, API route detection, and git history. All static analysis. Zero AI tokens."
>
> *(result appears)*
>
> "Done. 1.2 seconds. Generated a 4.6 KB file — about 1,100 tokens. Compare that to an AI agent exploring the same repo: 50,000+ tokens. That's a **44x reduction**."

---

### STEP 3: Show the Generated File (2 minutes)

**🖥️ What to do:**
```bash
cat ~/Repos/ts-mastery-hub/.ai-context.md
```

Or open it in VS Code / Cursor for syntax highlighting.

**🗣️ What to say:**

> "Let's look at what it generated..."
>
> *(scroll through the file)*
>
> "It has the complete file tree, all the npm scripts, dependencies categorized by type — framework, tooling, testing. The tsconfig settings. Every exported function with its TypeScript signature. Git history showing who contributed and which files change most."
>
> "An AI reading this file immediately knows: this is a TypeScript CLI tool with 9 source files, it uses chalk and inquirer, it has 8 exported async functions, and the main entry point is src/cli/index.ts. No exploration needed."

---

### STEP 4: The Comparison — Before vs After (3 minutes) ⭐ KEY MOMENT

**🖥️ What to do:**
1. Open Cursor or Claude CLI
2. **WITHOUT context file**: Ask "What does this project do and how is it structured?" and watch it explore files
3. **WITH context file**: Attach `.ai-context.md` and ask the same question

**🗣️ What to say:**

> "Now the real proof. Let me ask an AI the same question two ways."
>
> "First, WITHOUT the context file — I just ask Claude: 'explain this project.'"
>
> *(show the AI reading multiple files, taking time)*
>
> "It's reading file after file. Every file it reads costs tokens."
>
> "Now WITH the context file — I attach .ai-context.md and ask the same thing."
>
> *(show the AI immediately answering with full understanding)*
>
> "Instant. One file read. Full understanding. Same quality answer, fraction of the cost."

---

### STEP 5: The Math (1 minute)

**🗣️ What to say:**

> "Let's do the math. If you have 10 engineers each having 5 AI conversations per day about the codebase — that's 50 conversations. At 50,000 tokens each, that's 2.5 million tokens per day, just on exploration."
>
> "With this tool? 50 conversations × 1,100 tokens = 55,000 tokens. Same understanding, **45x less spend**."
>
> "And the context file is generated once — takes 2 seconds — and everyone reuses it. You can even commit it to your repo and keep it in version control."

---

### STEP 6: How It Works (1 minute — for technical audiences)

**🗣️ What to say:**

> "Under the hood, there are 6 static analyzers:
> 1. **File structure** — walks the filesystem, counts file types
> 2. **Dependencies** — parses package.json, categorizes them
> 3. **Config detection** — finds tsconfig, Docker, CI/CD, Prisma, etc.
> 4. **TypeScript AST** — uses ts-morph to extract every exported function, interface, type, and class with their full signatures
> 5. **API routes** — pattern-matches Express, Next.js, NestJS, FastAPI routes
> 6. **Git history** — identifies contributors, hotspot files, recent commits
>
> No AI. No API calls. No tokens. Just code parsing."

---

### STEP 7: Wrap Up (1 minute)

**🗣️ What to say:**

> "So: `codebase-context-gen`. One command, generates a compact AI context file from any codebase. Zero tokens to generate, saves 40-50x tokens on every AI conversation after that."
>
> "It's open source, on my GitHub. Clone it, try it on your projects."
>
> *(share link in chat)*

---

## 🔗 Links for Chat

```
🧠 codebase-context-gen
📦 Repo: https://github.com/tanwigeetika1618/codebase-context-gen

Quick try:
git clone https://github.com/tanwigeetika1618/codebase-context-gen.git
cd codebase-context-gen && npm install
node dist/index.js /path/to/any/project
```

---

## 🛑 Troubleshooting

| Problem | Fix |
|---------|-----|
| `ts-morph` timeout on huge repo | Use `--no-types` to skip TS analysis |
| No git history | Use `--no-git` if the repo is freshly cloned |
| Too deep directory tree | Use `--max-depth 3` to limit tree depth |
| Permission errors | Make sure you have read access to the target repo |
