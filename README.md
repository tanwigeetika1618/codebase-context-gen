# 🧠 codebase-context-gen

> Generate a compact AI-friendly context file from any codebase using **static analysis** — zero AI tokens, 10x faster onboarding.

**Built by [Tanvi Geetika](https://github.com/tanwigeetika1618) at [Red Hat](https://redhat.com)**

---

## The Problem

Every time you use an AI agent (Cursor, Claude, Codex) to understand a codebase, it reads file after file, burning **50,000+ tokens** just to figure out the architecture. Multiply that by every team member, every conversation — and you're wasting budget on the same exploration over and over.

## The Solution

Run **one command**. Get a compact `.ai-context.md` file (~1-5 KB) that maps your entire codebase: structure, dependencies, types, API routes, config, git history. Feed this to **any AI tool** and it immediately understands your project — using **~1,000 tokens instead of 50,000**.

**No AI is used to generate the file.** It's pure static analysis — AST parsing, filesystem walking, git log, dependency graphs. Zero tokens consumed.

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/tanwigeetika1618/codebase-context-gen.git
cd codebase-context-gen && npm install

# Generate context for any project
npx tsx src/index.ts /path/to/your/project

# Or after building
npm run build
node dist/index.js /path/to/your/project
```

This creates a `.ai-context.md` file in the target project directory.

## 📖 Usage

```bash
# Basic usage — analyze current directory
ctx-gen .

# Analyze a specific project
ctx-gen /path/to/project

# Custom output file
ctx-gen /path/to/project -o CONTEXT.md

# Skip git analysis (e.g., for fresh repos)
ctx-gen /path/to/project --no-git

# Skip TypeScript type analysis
ctx-gen /path/to/project --no-types

# Verbose output
ctx-gen /path/to/project -v

# Limit directory tree depth
ctx-gen /path/to/project --max-depth 4
```

## 🔍 What It Analyzes

| Analyzer | What It Extracts | Method |
|----------|-----------------|--------|
| **📁 Structure** | File tree, file count, file types | Filesystem walk |
| **📦 Dependencies** | package.json, scripts, deps categorized by type | JSON parsing |
| **⚙️ Config** | tsconfig, ESLint, Docker, CI/CD, Prisma, etc. | Pattern matching |
| **🔷 TypeScript** | Exported functions, interfaces, types, classes, enums with signatures | AST parsing (ts-morph) |
| **🔌 Routes** | Express/Next.js/NestJS/FastAPI API endpoints | Regex pattern matching |
| **📊 Git** | Contributors, hotspot files, recent commits | Git CLI |

## 💡 How to Use the Generated File

Once you have `.ai-context.md`, feed it to your AI tool:

### Cursor
Add the file to your chat context with `@.ai-context.md`, or just drop it in the conversation.

### Claude CLI
```bash
cat .ai-context.md | claude "explain the architecture of this project"
```

### Codex / ChatGPT
Paste the file contents at the start of your conversation.

### Any AI Tool
The file is just markdown — paste it anywhere as context.

## 📊 Token Savings

| Scenario | Without ctx-gen | With ctx-gen | Savings |
|----------|----------------|--------------|---------|
| Single AI conversation | ~50,000 tokens | ~1,000 tokens | **50x** |
| 5 team members onboarding | ~250,000 tokens | ~5,000 tokens | **50x** |
| 20 daily AI chats about codebase | ~1,000,000 tokens | ~20,000 tokens | **50x** |

## 🏗️ Project Structure

```
codebase-context-gen/
├── src/
│   ├── index.ts              # CLI entry point (commander)
│   ├── generator.ts          # Orchestrates all analyzers
│   ├── ui/
│   │   └── banner.ts         # CLI banner
│   └── analyzers/
│       ├── structure.ts      # File tree & stats
│       ├── dependencies.ts   # package.json / requirements.txt
│       ├── config.ts         # Config file detection
│       ├── typescript.ts     # TS AST analysis (ts-morph)
│       ├── routes.ts         # API route detection
│       └── git.ts            # Git history analysis
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

Contributions welcome! Ideas for new analyzers:
- Database schema extraction (SQL files, migrations)
- Docker Compose service mapping
- Environment variable documentation
- Test coverage summary
- README/documentation quality check

## 📄 License

MIT © [Tanvi Geetika](https://github.com/tanwigeetika1618)

---

<p align="center">
  <b>🧠 Stop burning tokens. Generate context once, reuse forever.</b>
</p>
