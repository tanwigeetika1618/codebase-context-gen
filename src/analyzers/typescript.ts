import { Project, SyntaxKind, SourceFile, Node } from "ts-morph";
import { join } from "path";
import { existsSync } from "fs";
import { glob } from "glob";

interface ExportedItem {
  name: string;
  kind: string;
  file: string;
  signature?: string;
}

function extractExports(sourceFile: SourceFile, relativePath: string): ExportedItem[] {
  const items: ExportedItem[] = [];

  // Exported functions
  for (const fn of sourceFile.getFunctions()) {
    if (fn.isExported()) {
      const name = fn.getName() || "anonymous";
      const params = fn.getParameters()
        .map((p) => `${p.getName()}: ${p.getType().getText(p)}`)
        .join(", ");
      const returnType = fn.getReturnType().getText(fn);
      items.push({
        name,
        kind: fn.isAsync() ? "async function" : "function",
        file: relativePath,
        signature: `(${params}) => ${returnType}`,
      });
    }
  }

  // Exported interfaces
  for (const iface of sourceFile.getInterfaces()) {
    if (iface.isExported()) {
      const props = iface.getProperties()
        .slice(0, 8)
        .map((p) => `${p.getName()}: ${p.getType().getText(p)}`)
        .join("; ");
      items.push({
        name: iface.getName(),
        kind: "interface",
        file: relativePath,
        signature: `{ ${props}${iface.getProperties().length > 8 ? "; ..." : ""} }`,
      });
    }
  }

  // Exported type aliases
  for (const typeAlias of sourceFile.getTypeAliases()) {
    if (typeAlias.isExported()) {
      const text = typeAlias.getType().getText(typeAlias);
      const short = text.length > 80 ? text.slice(0, 77) + "..." : text;
      items.push({
        name: typeAlias.getName(),
        kind: "type",
        file: relativePath,
        signature: short,
      });
    }
  }

  // Exported classes
  for (const cls of sourceFile.getClasses()) {
    if (cls.isExported()) {
      const methods = cls.getMethods()
        .filter((m) => m.getScope() === undefined || m.getScope() === "public")
        .slice(0, 6)
        .map((m) => m.getName());
      items.push({
        name: cls.getName() || "AnonymousClass",
        kind: "class",
        file: relativePath,
        signature: methods.length > 0 ? `methods: ${methods.join(", ")}` : undefined,
      });
    }
  }

  // Exported enums
  for (const en of sourceFile.getEnums()) {
    if (en.isExported()) {
      const members = en.getMembers().map((m) => m.getName());
      items.push({
        name: en.getName(),
        kind: "enum",
        file: relativePath,
        signature: members.join(" | "),
      });
    }
  }

  return items;
}

export async function analyzeTypeScript(
  targetDir: string
): Promise<{ section: string; content: string; itemCount: number }> {
  const tsconfigPath = join(targetDir, "tsconfig.json");
  const hasConfig = existsSync(tsconfigPath);

  // Find TS files
  const tsFiles = await glob("**/*.{ts,tsx}", {
    cwd: targetDir,
    ignore: ["node_modules/**", "dist/**", "build/**", "*.d.ts", "**/*.d.ts", "**/*.spec.ts", "**/*.test.ts"],
    absolute: false,
  });

  if (tsFiles.length === 0) {
    throw new Error("No TypeScript files found");
  }

  let project: Project;
  try {
    project = new Project({
      tsConfigFilePath: hasConfig ? tsconfigPath : undefined,
      skipAddingFilesFromTsConfig: true,
      compilerOptions: hasConfig ? undefined : { strict: true, target: 99 },
    });
  } catch {
    project = new Project({
      skipAddingFilesFromTsConfig: true,
      compilerOptions: { strict: true, target: 99, allowJs: true },
    });
  }

  // Add files (limit to avoid performance issues on huge repos)
  const filesToAnalyze = tsFiles.slice(0, 100);
  for (const file of filesToAnalyze) {
    try {
      project.addSourceFileAtPath(join(targetDir, file));
    } catch {
      // skip files that fail to parse
    }
  }

  const allExports: ExportedItem[] = [];

  for (const sourceFile of project.getSourceFiles()) {
    const relativePath = sourceFile.getFilePath().replace(targetDir + "/", "");
    const exports = extractExports(sourceFile, relativePath);
    allExports.push(...exports);
  }

  let content = `## 🔷 TypeScript Exports & Types\n\n`;
  content += `- **TypeScript files:** ${tsFiles.length}${tsFiles.length > 100 ? " (analyzed first 100)" : ""}\n`;
  content += `- **Exported items:** ${allExports.length}\n`;
  if (hasConfig) content += `- **tsconfig.json:** present\n`;
  content += `\n`;

  if (allExports.length > 0) {
    // Group by kind
    const grouped = new Map<string, ExportedItem[]>();
    for (const item of allExports) {
      const existing = grouped.get(item.kind) || [];
      existing.push(item);
      grouped.set(item.kind, existing);
    }

    for (const [kind, items] of grouped) {
      content += `### ${kindEmoji(kind)} Exported ${kind}s (${items.length})\n\n`;
      content += `| Name | File | Signature |\n|------|------|-----------|\n`;
      for (const item of items.slice(0, 30)) {
        const sig = item.signature
          ? `\`${item.signature.replace(/\|/g, "\\|")}\``
          : "—";
        content += `| \`${item.name}\` | \`${item.file}\` | ${sig} |\n`;
      }
      if (items.length > 30) {
        content += `\n_...and ${items.length - 30} more ${kind}s_\n`;
      }
      content += `\n`;
    }
  }

  return { section: "typescript", content, itemCount: allExports.length };
}

function kindEmoji(kind: string): string {
  switch (kind) {
    case "function":
    case "async function":
      return "⚡";
    case "interface":
      return "📐";
    case "type":
      return "🏷️";
    case "class":
      return "🏗️";
    case "enum":
      return "📋";
    default:
      return "📦";
  }
}
