import { readFileSync } from "fs";
import { glob } from "glob";
import { join } from "path";

interface Route {
  method: string;
  path: string;
  file: string;
  line: number;
}

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "options", "head"];

const ROUTE_PATTERNS: RegExp[] = [
  // Express/Koa/Hono style: app.get('/path', ...) or router.post('/path', ...)
  /\.(get|post|put|patch|delete|options|head)\s*\(\s*['"`]([^'"`]+)['"`]/gi,
  // NestJS decorators: @Get('/path'), @Post('/path')
  /@(Get|Post|Put|Patch|Delete|Options|Head)\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/gi,
  // FastAPI style: @app.get("/path")
  /@app\.(get|post|put|patch|delete)\s*\(\s*['"`]([^'"`]+)['"`]/gi,
  // Next.js API routes: export async function GET/POST
  /export\s+(?:async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE)\s*\(/gi,
];

export async function analyzeRoutes(
  targetDir: string
): Promise<{ section: string; content: string; itemCount: number }> {
  const sourceFiles = await glob(
    "**/*.{ts,tsx,js,jsx,py}",
    {
      cwd: targetDir,
      ignore: [
        "node_modules/**", "dist/**", "build/**",
        "*.test.*", "*.spec.*", "**/__tests__/**",
      ],
      absolute: false,
    }
  );

  const routes: Route[] = [];

  for (const file of sourceFiles) {
    const fullPath = join(targetDir, file);
    let fileContent: string;
    try {
      fileContent = readFileSync(fullPath, "utf-8");
    } catch {
      continue;
    }

    const lines = fileContent.split("\n");

    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];

      for (const pattern of ROUTE_PATTERNS) {
        pattern.lastIndex = 0;
        const match = pattern.exec(line);
        if (match) {
          const method = match[1].toUpperCase();
          const path = match[2] || "/";
          routes.push({ method, path, file, line: lineNum + 1 });
        }
      }
    }

    // Next.js file-based routing detection
    if (file.match(/app\/.*\/(route|page)\.(ts|tsx|js|jsx)$/) ||
        file.match(/pages\/api\/.*\.(ts|tsx|js|jsx)$/)) {
      const routePath = file
        .replace(/^(src\/)?(app|pages\/api)/, "")
        .replace(/\/(route|page)\.(ts|tsx|js|jsx)$/, "")
        .replace(/\.(ts|tsx|js|jsx)$/, "")
        .replace(/\[([^\]]+)\]/g, ":$1")
        || "/";

      // Check which HTTP methods are exported
      for (const method of HTTP_METHODS) {
        const exportPattern = new RegExp(
          `export\\s+(?:async\\s+)?function\\s+${method.toUpperCase()}`,
          "i"
        );
        if (exportPattern.test(fileContent)) {
          routes.push({
            method: method.toUpperCase(),
            path: routePath,
            file,
            line: 1,
          });
        }
      }
    }
  }

  if (routes.length === 0) {
    throw new Error("No API routes detected");
  }

  // Deduplicate
  const unique = routes.filter(
    (r, i, arr) =>
      arr.findIndex(
        (r2) => r2.method === r.method && r2.path === r.path && r2.file === r.file
      ) === i
  );

  let content = `## 🔌 API Routes & Endpoints (${unique.length})\n\n`;
  content += `| Method | Path | File | Line |\n|--------|------|------|------|\n`;

  const sorted = unique.sort((a, b) => a.path.localeCompare(b.path));
  for (const route of sorted) {
    content += `| \`${route.method}\` | \`${route.path}\` | \`${route.file}\` | L${route.line} |\n`;
  }

  return { section: "routes", content, itemCount: unique.length };
}
