import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { glob } from "glob";

interface ConfigFile {
  name: string;
  purpose: string;
  highlights?: string[];
}

const KNOWN_CONFIGS: [string, string][] = [
  ["tsconfig.json", "TypeScript compiler configuration"],
  ["tsconfig.*.json", "TypeScript project reference"],
  [".eslintrc*", "ESLint linting rules"],
  ["eslint.config.*", "ESLint flat config"],
  [".prettierrc*", "Prettier code formatting"],
  ["prettier.config.*", "Prettier code formatting"],
  ["vite.config.*", "Vite build tool configuration"],
  ["next.config.*", "Next.js framework configuration"],
  ["nuxt.config.*", "Nuxt framework configuration"],
  ["webpack.config.*", "Webpack bundler configuration"],
  ["rollup.config.*", "Rollup bundler configuration"],
  ["tailwind.config.*", "Tailwind CSS configuration"],
  ["postcss.config.*", "PostCSS configuration"],
  ["jest.config.*", "Jest testing configuration"],
  ["vitest.config.*", "Vitest testing configuration"],
  ["playwright.config.*", "Playwright E2E testing"],
  ["cypress.config.*", "Cypress E2E testing"],
  [".github/workflows/*.yml", "GitHub Actions CI/CD"],
  [".github/workflows/*.yaml", "GitHub Actions CI/CD"],
  ["Dockerfile", "Docker container definition"],
  ["docker-compose.*", "Docker Compose services"],
  [".env.example", "Environment variables template"],
  ["prisma/schema.prisma", "Prisma database schema"],
  ["drizzle.config.*", "Drizzle ORM configuration"],
  ["turbo.json", "Turborepo monorepo configuration"],
  ["nx.json", "Nx monorepo configuration"],
  ["lerna.json", "Lerna monorepo configuration"],
  ["pnpm-workspace.yaml", "pnpm workspace configuration"],
];

export async function analyzeConfig(
  targetDir: string
): Promise<{ section: string; content: string; itemCount: number }> {
  const found: ConfigFile[] = [];

  for (const [pattern, purpose] of KNOWN_CONFIGS) {
    const matches = await glob(pattern, {
      cwd: targetDir,
      dot: true,
      ignore: ["node_modules/**"],
    });

    for (const match of matches) {
      const configInfo: ConfigFile = { name: match, purpose };

      // Extract highlights from key config files
      const fullPath = join(targetDir, match);
      if (existsSync(fullPath)) {
        try {
          configInfo.highlights = extractHighlights(fullPath, match);
        } catch {
          // skip
        }
      }

      found.push(configInfo);
    }
  }

  if (found.length === 0) {
    throw new Error("No configuration files detected");
  }

  let content = `## ⚙️ Configuration Files (${found.length})\n\n`;
  content += `| File | Purpose | Key Settings |\n|------|---------|-------------|\n`;

  for (const config of found) {
    const highlights = config.highlights?.join(", ") || "—";
    content += `| \`${config.name}\` | ${config.purpose} | ${highlights} |\n`;
  }

  // Detect project type / framework
  const frameworks = detectFramework(found.map((f) => f.name));
  if (frameworks.length > 0) {
    content += `\n### 🏗️ Detected Stack\n\n`;
    content += frameworks.map((f) => `- ${f}`).join("\n") + "\n";
  }

  return { section: "config", content, itemCount: found.length };
}

function extractHighlights(filePath: string, fileName: string): string[] {
  const raw = readFileSync(filePath, "utf-8");
  const highlights: string[] = [];

  if (fileName === "tsconfig.json" || fileName.match(/^tsconfig\..*\.json$/)) {
    try {
      const config = JSON.parse(raw);
      const co = config.compilerOptions || {};
      if (co.target) highlights.push(`target: ${co.target}`);
      if (co.module) highlights.push(`module: ${co.module}`);
      if (co.strict !== undefined) highlights.push(`strict: ${co.strict}`);
      if (co.jsx) highlights.push(`jsx: ${co.jsx}`);
    } catch {
      // malformed json
    }
  }

  if (fileName === "prisma/schema.prisma") {
    const models = raw.match(/^model\s+(\w+)/gm);
    if (models) {
      highlights.push(`models: ${models.map((m) => m.replace("model ", "")).join(", ")}`);
    }
    const provider = raw.match(/provider\s*=\s*"(\w+)"/);
    if (provider) highlights.push(`db: ${provider[1]}`);
  }

  if (fileName === "Dockerfile") {
    const from = raw.match(/^FROM\s+(.+)/m);
    if (from) highlights.push(`base: ${from[1].split(" ")[0]}`);
  }

  return highlights;
}

function detectFramework(configFiles: string[]): string[] {
  const stack: string[] = [];
  const names = new Set(configFiles);

  if (configFiles.some((f) => f.startsWith("next.config"))) stack.push("**Next.js** (React framework)");
  if (configFiles.some((f) => f.startsWith("nuxt.config"))) stack.push("**Nuxt** (Vue framework)");
  if (configFiles.some((f) => f.startsWith("vite.config"))) stack.push("**Vite** (build tool)");
  if (configFiles.some((f) => f.startsWith("tailwind.config"))) stack.push("**Tailwind CSS**");
  if (names.has("prisma/schema.prisma")) stack.push("**Prisma** (ORM)");
  if (configFiles.some((f) => f.startsWith("vitest.config"))) stack.push("**Vitest** (testing)");
  if (configFiles.some((f) => f.startsWith("playwright.config"))) stack.push("**Playwright** (E2E testing)");
  if (names.has("turbo.json")) stack.push("**Turborepo** (monorepo)");
  if (names.has("Dockerfile")) stack.push("**Docker** (containerized)");
  if (configFiles.some((f) => f.includes(".github/workflows"))) stack.push("**GitHub Actions** (CI/CD)");

  return stack;
}
