import { readFileSync, existsSync } from "fs";
import { join } from "path";

export async function analyzeDependencies(
  targetDir: string
): Promise<{ section: string; content: string; itemCount: number }> {
  const pkgPath = join(targetDir, "package.json");
  if (!existsSync(pkgPath)) {
    return tryPythonDeps(targetDir);
  }

  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

  let content = `## 📦 Project Info\n\n`;
  content += `- **Name:** ${pkg.name || "unnamed"}\n`;
  if (pkg.description) content += `- **Description:** ${pkg.description}\n`;
  if (pkg.version) content += `- **Version:** ${pkg.version}\n`;
  if (pkg.license) content += `- **License:** ${pkg.license}\n`;

  if (pkg.engines) {
    content += `- **Engines:** ${Object.entries(pkg.engines).map(([k, v]) => `${k} ${v}`).join(", ")}\n`;
  }

  // Scripts
  if (pkg.scripts) {
    const scripts = Object.entries(pkg.scripts);
    content += `\n### Scripts (${scripts.length})\n\n`;
    content += `| Command | Action |\n|---------|--------|\n`;
    for (const [name, cmd] of scripts) {
      const shortCmd = String(cmd).length > 60 ? String(cmd).slice(0, 57) + "..." : cmd;
      content += `| \`npm run ${name}\` | \`${shortCmd}\` |\n`;
    }
  }

  // Entry points
  const entryPoints: string[] = [];
  if (pkg.main) entryPoints.push(`main: ${pkg.main}`);
  if (pkg.module) entryPoints.push(`module: ${pkg.module}`);
  if (pkg.types) entryPoints.push(`types: ${pkg.types}`);
  if (pkg.bin) {
    if (typeof pkg.bin === "string") {
      entryPoints.push(`bin: ${pkg.bin}`);
    } else {
      for (const [name, path] of Object.entries(pkg.bin)) {
        entryPoints.push(`bin(${name}): ${path}`);
      }
    }
  }

  if (entryPoints.length > 0) {
    content += `\n### Entry Points\n\n`;
    entryPoints.forEach((ep) => (content += `- ${ep}\n`));
  }

  // Dependencies
  const deps = pkg.dependencies || {};
  const devDeps = pkg.devDependencies || {};
  const allDeps = Object.keys(deps);
  const allDevDeps = Object.keys(devDeps);
  const totalCount = allDeps.length + allDevDeps.length;

  if (allDeps.length > 0) {
    content += `\n### Dependencies (${allDeps.length})\n\n`;
    const categorized = categorizeDeps(allDeps);
    for (const [category, list] of Object.entries(categorized)) {
      if (list.length > 0) {
        content += `**${category}:** ${list.join(", ")}\n\n`;
      }
    }
  }

  if (allDevDeps.length > 0) {
    content += `### Dev Dependencies (${allDevDeps.length})\n\n`;
    content += allDevDeps.join(", ") + "\n";
  }

  return { section: "dependencies", content, itemCount: totalCount };
}

function categorizeDeps(deps: string[]): Record<string, string[]> {
  const categories: Record<string, string[]> = {
    "Framework": [],
    "UI / Styling": [],
    "Database / ORM": [],
    "Validation": [],
    "Testing": [],
    "Auth": [],
    "API / HTTP": [],
    "Build / Tooling": [],
    "Other": [],
  };

  const rules: [RegExp, string][] = [
    [/^(react|next|vue|nuxt|angular|svelte|solid|remix|astro|express|fastify|koa|hono|nestjs|@nestjs)/, "Framework"],
    [/^(tailwind|@mui|chakra|styled-|emotion|sass|postcss|css-|radix|shadcn|antd|bootstrap)/, "UI / Styling"],
    [/^(prisma|@prisma|drizzle|typeorm|sequelize|mongoose|knex|pg|mysql|redis|ioredis|mongodb)/, "Database / ORM"],
    [/^(zod|yup|joi|ajv|class-validator|superstruct|valibot)/, "Validation"],
    [/^(jest|vitest|@testing|mocha|chai|cypress|playwright|@playwright|supertest|msw|sinon)/, "Testing"],
    [/^(passport|bcrypt|jsonwebtoken|jose|next-auth|@auth|lucia|clerk)/, "Auth"],
    [/^(axios|node-fetch|got|ky|superagent|@trpc|graphql|@apollo|urql|swr|@tanstack)/, "API / HTTP"],
    [/^(typescript|@types|esbuild|vite|webpack|rollup|turbo|tsup|tsx|swc|babel|eslint|prettier)/, "Build / Tooling"],
  ];

  for (const dep of deps) {
    let matched = false;
    for (const [pattern, category] of rules) {
      if (pattern.test(dep)) {
        categories[category].push(dep);
        matched = true;
        break;
      }
    }
    if (!matched) categories["Other"].push(dep);
  }

  return Object.fromEntries(
    Object.entries(categories).filter(([, list]) => list.length > 0)
  );
}

async function tryPythonDeps(
  targetDir: string
): Promise<{ section: string; content: string; itemCount: number }> {
  const reqPath = join(targetDir, "requirements.txt");
  const pyprojectPath = join(targetDir, "pyproject.toml");

  let content = `## 📦 Project Info\n\n`;
  let count = 0;

  if (existsSync(reqPath)) {
    const lines = readFileSync(reqPath, "utf-8")
      .split("\n")
      .filter((l) => l.trim() && !l.startsWith("#"));
    content += `- **Type:** Python project\n`;
    content += `- **Dependencies (${lines.length}):** ${lines.map((l) => l.split("==")[0].split(">=")[0].trim()).join(", ")}\n`;
    count = lines.length;
  } else if (existsSync(pyprojectPath)) {
    content += `- **Type:** Python project (pyproject.toml)\n`;
    content += `- See \`pyproject.toml\` for full dependency list\n`;
    count = 1;
  } else {
    content += `- No package.json or requirements.txt found\n`;
  }

  return { section: "dependencies", content, itemCount: count };
}
