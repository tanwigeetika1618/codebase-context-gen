import { readdirSync, statSync } from "fs";
import { join, relative } from "path";

const IGNORE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", ".next", ".nuxt",
  "__pycache__", ".venv", "venv", ".tox", "coverage",
  ".nyc_output", ".cache", ".parcel-cache", ".turbo",
  ".svelte-kit", "target", "vendor", ".gradle",
]);

const IGNORE_FILES = new Set([
  ".DS_Store", "Thumbs.db", "package-lock.json", "yarn.lock",
  "pnpm-lock.yaml", ".env", ".env.local",
]);

interface TreeNode {
  name: string;
  type: "file" | "dir";
  children?: TreeNode[];
}

function buildTree(dir: string, depth: number, maxDepth: number): TreeNode[] {
  if (depth >= maxDepth) return [];
  const entries = readdirSync(dir, { withFileTypes: true });
  const nodes: TreeNode[] = [];

  const sortedEntries = entries
    .filter((e) => !e.name.startsWith(".") || e.name === ".env.example")
    .filter((e) => !IGNORE_DIRS.has(e.name))
    .filter((e) => !IGNORE_FILES.has(e.name))
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  for (const entry of sortedEntries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const children = buildTree(fullPath, depth + 1, maxDepth);
      nodes.push({ name: entry.name + "/", type: "dir", children });
    } else {
      nodes.push({ name: entry.name, type: "file" });
    }
  }

  return nodes;
}

function renderTree(nodes: TreeNode[], prefix = ""): string {
  let output = "";
  nodes.forEach((node, i) => {
    const isLast = i === nodes.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = isLast ? "    " : "│   ";

    output += `${prefix}${connector}${node.name}\n`;
    if (node.children && node.children.length > 0) {
      output += renderTree(node.children, prefix + childPrefix);
    }
  });
  return output;
}

function countFiles(dir: string): { files: number; dirs: number; extensions: Map<string, number> } {
  let files = 0;
  let dirs = 0;
  const extensions = new Map<string, number>();

  function walk(d: string) {
    const entries = readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
      const fullPath = join(d, entry.name);
      if (entry.isDirectory()) {
        dirs++;
        walk(fullPath);
      } else if (!IGNORE_FILES.has(entry.name)) {
        files++;
        const ext = entry.name.includes(".") ? "." + entry.name.split(".").pop() : "(no ext)";
        extensions.set(ext, (extensions.get(ext) || 0) + 1);
      }
    }
  }

  walk(dir);
  return { files, dirs, extensions };
}

export async function analyzeStructure(
  targetDir: string,
  maxDepth: number
): Promise<{ section: string; content: string; itemCount: number }> {
  const tree = buildTree(targetDir, 0, maxDepth);
  const treeStr = renderTree(tree);
  const stats = countFiles(targetDir);

  const topExtensions = [...stats.extensions.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([ext, count]) => `${ext} (${count})`)
    .join(", ");

  let content = `## 📁 Project Structure\n\n`;
  content += `- **Files:** ${stats.files} | **Directories:** ${stats.dirs}\n`;
  content += `- **Top file types:** ${topExtensions}\n\n`;
  content += `\`\`\`\n${treeStr}\`\`\`\n`;

  return {
    section: "structure",
    content,
    itemCount: stats.files + stats.dirs,
  };
}
