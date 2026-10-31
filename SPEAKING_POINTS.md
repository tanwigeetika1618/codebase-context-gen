# 🎤 Speaking Points — What to Say at Every Step

> This is your script. Read it before the demo, keep it open on a second screen during the demo.
> Location on your laptop: `~/Repos/demo-guides/SPEAKING_POINTS.md`

---

## Table of Contents

1. [Demo 1: TS Mastery Hub — Speaking Script](#demo-1-ts-mastery-hub--speaking-script)
2. [Demo 2: Codebase Context Generator — Speaking Script](#demo-2-codebase-context-generator--speaking-script)

---

---

# Demo 1: TS Mastery Hub — Speaking Script

**Total time: 12-15 minutes**

---

## Step 1: Introduction (before showing anything)

> "Hey everyone! So today I want to share something I've been working on."
>
> "We all use TypeScript every day, but I noticed there's no single place where we — as a team — can go to brush up on concepts, learn new patterns, or find the best resources."
>
> "So I built **TS Mastery Hub**. It has two parts — a CLI tool that runs right in your terminal, and a companion web page. Let me show you both."

---

## Step 2: Showing the GitHub Repo

> "Here's the repo on GitHub. It's open source, MIT licensed."
>
> "You can clone it and run it in three commands — clone, install, run. That's it."
>
> "And notice — the entire project is written in TypeScript. So the repo itself is an example of a well-structured TypeScript project. You're learning by looking at the source code too."

---

## Step 3: Launching the CLI

> "Let me run it. Just `npm run dev`..."
>
> *(wait for the banner to appear)*
>
> "You get this gradient ASCII art banner — looks nice in the terminal. And below it, an interactive menu with six features. Let me walk through each one."

---

## Step 4: Learning Paths

> "First up — **Learning Paths**. We have four structured paths:"
>
> "TypeScript Foundations, React plus TypeScript, Node.js plus TypeScript, and Testing."
>
> "Let me open TypeScript Foundations..."
>
> *(table appears)*
>
> "Each module has a description, a time estimate, and a difficulty level — green is beginner, yellow is intermediate, red is advanced."
>
> "So if someone says 'I want to understand generics,' they can see — okay, that's about 4-5 hours, it's intermediate, and here's what I'll learn."
>
> "The total for this path is about 20 hours. Nothing crazy — you could do it in two weeks of casual learning."

---

## Step 5: Interactive Challenge ⭐

> "Now the fun part — **interactive challenges**. Let me pick an intermediate one..."
>
> *(challenge appears)*
>
> "Okay, here's the question."
>
> *(READ THE QUESTION OUT LOUD)*
>
> "Take a look at the code. What do you think? A, B, C, or D?"
>
> *(PAUSE — wait 10-15 seconds for people to respond in chat)*
>
> "Let's see..."
>
> *(select the answer)*
>
> **If correct answer shown:**
> "Nice! And here's the explanation — *(briefly summarize the explanation)*. This is the kind of thing that comes up in code reviews all the time."
>
> **If wrong answer shown:**
> "Okay, so the correct answer was *(read it)*. And here's why — *(briefly summarize)*. Don't worry, that one trips up a lot of people."
>
> *(do one more challenge)*
>
> "Let me try one more, this time a random one..."
>
> *(repeat the same flow)*

---

## Step 6: Cheat Sheets

> "We also have **cheat sheets** — quick reference cards for when you're coding and forget the syntax."
>
> "Let me show Utility Types — Partial, Pick, Omit, Record... these are the ones I see people Googling the most."
>
> *(scroll through a few cards)*
>
> "Each card shows the syntax with an example. No fluff, just what you need."

---

## Step 7: Developer Roadmap

> "Here's a **visual roadmap** — five phases from TypeScript basics all the way to advanced patterns."
>
> "Each phase has a time estimate. The whole journey is about 8-12 weeks at a comfortable pace."
>
> "The idea is — if you already know TypeScript basics, skip to Phase 2. If you're new, start at Phase 1. It's self-paced."

---

## Step 8: Resources & Tips (quick)

> "There's also a list of **30+ curated resources** — official docs, YouTube channels, practice platforms, all organized by category."
>
> "And my personal favorite — **Pro Tips and Patterns**. These are real-world things. Like the `satisfies` operator, branded types for type-safe IDs, using Zod for runtime validation."
>
> "These are patterns we actually use in production. Not textbook stuff."

---

## Step 9: Web Companion

> "Now let me switch to the browser."
>
> "For those who prefer a visual experience, there's a **web companion**."
>
> *(scrolling through the website slowly)*
>
> "Same content, but as a beautiful dark-themed web page. Animated cards, syntax-highlighted code, clickable resource links."
>
> "This is hosted on GitHub Pages — so you can bookmark it and come back anytime."
>
> *(scroll to the terminal mockup section)*
>
> "And down here, there's even a preview of what the CLI looks like, plus the three commands to get started."

---

## Step 10: Runnable Examples (optional)

> "One more thing — the repo also has runnable TypeScript example files."
>
> *(switch to terminal)*
>
> "If I run `npx tsx examples/03-generics/generics.ts`..."
>
> *(output appears)*
>
> "You get actual TypeScript code running with real output. Each example covers a topic — basics, interfaces, generics, utility types, advanced patterns. You can read the code, modify it, and run it yourself."

---

## Step 11: Wrap Up

> "So that's **TS Mastery Hub**. Quick recap:"
>
> "Clone the repo, run `npm run dev` — you get an interactive TypeScript learning tool in your terminal."
>
> "Or visit the website for a visual reference."
>
> "It covers TypeScript, React, Node, and Testing — with challenges you can quiz yourself with, cheat sheets for quick reference, and curated resources."
>
> "I'm dropping the repo link in the chat now. Feel free to clone it, try the challenges, and if you have ideas or want to add content — PRs are welcome!"
>
> *(paste the links in chat)*
>
> "Any questions?"

---

---

# Demo 2: Codebase Context Generator — Speaking Script

**Total time: 10-12 minutes**

---

## Step 1: The Problem (set the stage)

> "Quick show of hands — how many of you use AI to help understand a new codebase? Cursor, Claude, Codex, ChatGPT — anything."
>
> *(pause for hands/reactions)*
>
> "Okay, and how many of you have noticed that it burns through a LOT of tokens doing that?"
>
> "Here's what happens every time: you open a new project, you ask the AI 'what does this project do?' And the AI starts reading file... after file... after file. It explores the directory, reads the package.json, opens the source files, tries to piece together the architecture."
>
> "That's easily 50,000 tokens. Just to understand the project structure."
>
> "Now multiply that. Every new conversation about the same codebase — same exploration. Every new team member who asks the AI about the code — same exploration. Five team members, five conversations each per day — that's over 1 million tokens a day, just on exploration."
>
> "If you're on an enterprise plan with a monthly budget — like we are at Red Hat — that adds up really fast. I was burning through my $300 monthly budget in 12 days."
>
> "So I asked myself: what if we could give the AI a **map** of the codebase before it starts? Not generated by AI — that would cost tokens too — but using **static analysis**. Just parse the code. Read the file tree. Extract the types. Zero tokens."

---

## Step 2: Run It Live

> "Let me show you. One command."
>
> *(type the command)*
>
> "I'm running `codebase-context-gen` on my TypeScript Mastery Hub project."
>
> *(spinners appear)*
>
> "You can see the analyzers running — file structure, dependencies, configuration detection, TypeScript AST parsing, API route detection, git history. Each one uses static analysis. No AI calls."
>
> *(result box appears)*
>
> "Done. Look at the numbers:"
>
> "File size: **4.6 KB**. That's about **1,100 tokens**."
>
> "Compare that to an AI agent exploring the same repo manually: **50,000+ tokens**."
>
> "That's a **44x reduction**. And it took less than 2 seconds."

---

## Step 3: Show the Generated File

> "Let me show you what it actually generated."
>
> *(open the .ai-context.md file)*
>
> "At the top — project structure. The complete file tree, file count, file types."
>
> *(scroll)*
>
> "Dependencies — not just a list, but categorized. Framework, tooling, testing, all separated."
>
> *(scroll)*
>
> "TypeScript exports — every exported function, interface, and type, with their full signatures. This is from AST parsing, not regex — it actually understands the TypeScript code."
>
> *(scroll)*
>
> "Git history — who contributed, which files change the most, recent commits."
>
> "An AI reading this file immediately knows: this is a TypeScript CLI tool with 9 source files, it uses chalk and inquirer, it has 8 exported async functions, and the entry point is `src/cli/index.ts`. No exploration needed."

---

## Step 4: Run It on a Big Repo

> "Now you might be wondering — does this work on real-world, larger codebases?"
>
> *(type the command for hono)*
>
> "Let me run it on the Hono web framework — that's a popular TypeScript framework with over 500 files."
>
> *(spinners run)*
>
> "Still finishes in under 2 seconds. Found 194 TypeScript exports, 995 API routes, 13 config files."
>
> "It scales."

---

## Step 5: Before vs After Comparison ⭐

> "Now here's the real proof. Let me show you the difference."
>
> **Part A — WITHOUT the context file:**
>
> "I'm opening Cursor, with the ts-mastery-hub project. No context file. I'm going to ask: 'explain the architecture of this project and where the main entry point is.'"
>
> *(let the AI explore files — it will read multiple files)*
>
> "Watch — it's reading package.json... now it's reading src/cli/index.ts... now it's going to the modules folder... it's reading menu.ts..."
>
> "This exploration? Each file read is thousands of tokens. And it does this every single time you start a new conversation."
>
> **Part B — WITH the context file:**
>
> "Now, new conversation. But this time, I attach the `.ai-context.md` file."
>
> *(attach the file and ask the same question)*
>
> "Same question: 'explain the architecture.'"
>
> *(AI answers immediately)*
>
> "Instant. It read ONE file — 1,100 tokens — and it has the complete picture. Same quality answer. Fraction of the cost."

---

## Step 6: The Math

> "Let's put some numbers on this."
>
> "If your team has 10 engineers, and each has 5 AI conversations per day about the codebase — that's 50 conversations."
>
> "At 50,000 tokens each? That's **2.5 million tokens per day** just on codebase exploration."
>
> "With the context file? 50 conversations times 1,100 tokens equals **55,000 tokens**. Same understanding. **45x less spend**."
>
> "And the context file is generated once — takes 2 seconds — and everyone reuses it. You can commit it to your repo and keep it updated."

---

## Step 7: How It Works (for technical audiences)

> "Under the hood, there are six static analyzers:"
>
> "One — **file structure**. Walks the filesystem, counts file types, builds the tree."
>
> "Two — **dependencies**. Parses package.json, categorizes libraries by type."
>
> "Three — **config detection**. Finds tsconfig, Docker, CI/CD, Prisma, and 25+ other config files."
>
> "Four — **TypeScript AST**. Uses `ts-morph` to extract every exported function, interface, type, and class — with full type signatures."
>
> "Five — **API routes**. Pattern-matches Express, Next.js, NestJS, FastAPI routes."
>
> "Six — **git history**. Identifies contributors, hotspot files, and recent commits."
>
> "All of this is deterministic static analysis. No AI. No API calls. No tokens consumed."

---

## Step 8: Wrap Up

> "So — `codebase-context-gen`. One command. Generates a compact AI context file from any codebase."
>
> "Zero tokens to generate. Saves 40 to 50x tokens on every AI conversation after that."
>
> "It's open source, on my GitHub. I'm dropping the link in the chat. Clone it, try it on your projects, and let me know what you think."
>
> *(paste links in chat)*
>
> "Questions?"

---

---

# 🆘 If You Go Blank

If you forget what to say at any point, fall back to these:

- **Describe what's on screen:** "So what you're seeing here is..."
- **State the benefit:** "The reason this is useful is..."
- **Ask the audience:** "Has anyone run into this before?"
- **Move on:** "Let me show you the next thing, which is really cool..."

You don't have to be perfect. The tools do the talking — you just narrate what people are seeing.

---

# 📍 Files on Your Laptop

| Document | Location |
|----------|----------|
| **This speaking script** | `~/Repos/demo-guides/SPEAKING_POINTS.md` |
| **How to run demos** | `~/Repos/demo-guides/HOW_TO_RUN_DEMOS.md` |
| **TS Mastery Hub repo** | `~/Repos/ts-mastery-hub/` |
| **Context Gen repo** | `~/Repos/codebase-context-gen/` |
