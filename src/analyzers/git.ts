import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

function run(cmd: string, cwd: string): string {
  try {
    return execSync(cmd, { cwd, encoding: "utf-8", timeout: 10000 }).trim();
  } catch {
    return "";
  }
}

export async function analyzeGitHistory(
  targetDir: string
): Promise<{ section: string; content: string; itemCount: number }> {
  if (!existsSync(join(targetDir, ".git"))) {
    throw new Error("Not a git repository");
  }

  let content = `## 📊 Git History\n\n`;
  let itemCount = 0;

  // Basic info
  const totalCommits = run("git rev-list --count HEAD", targetDir);
  const firstCommit = run('git log --reverse --format="%ai" | head -1', targetDir);
  const lastCommit = run('git log -1 --format="%ai"', targetDir);
  const branch = run("git branch --show-current", targetDir);
  const remoteName = run("git remote get-url origin 2>/dev/null", targetDir);

  content += `- **Current branch:** ${branch || "unknown"}\n`;
  if (remoteName) content += `- **Remote:** ${remoteName}\n`;
  content += `- **Total commits:** ${totalCommits || "unknown"}\n`;
  if (firstCommit) content += `- **First commit:** ${firstCommit.split(" ")[0]}\n`;
  if (lastCommit) content += `- **Last commit:** ${lastCommit.split(" ")[0]}\n`;

  // Contributors
  const contributors = run(
    'git shortlog -sne --no-merges HEAD | head -10',
    targetDir
  );
  if (contributors) {
    const contribLines = contributors.split("\n").filter(Boolean);
    content += `\n### Top Contributors (${contribLines.length})\n\n`;
    content += `| Commits | Author |\n|---------|--------|\n`;
    for (const line of contribLines) {
      const match = line.trim().match(/^(\d+)\s+(.+)$/);
      if (match) {
        content += `| ${match[1]} | ${match[2]} |\n`;
        itemCount++;
      }
    }
  }

  // Most changed files (hotspots)
  const hotspots = run(
    'git log --pretty=format: --name-only --since="6 months ago" | sort | uniq -c | sort -rn | head -15',
    targetDir
  );
  if (hotspots) {
    const hotLines = hotspots.split("\n").filter((l) => l.trim());
    content += `\n### Hotspot Files (most changed in 6 months)\n\n`;
    content += `These files change frequently — they're likely core to the architecture:\n\n`;
    for (const line of hotLines) {
      const match = line.trim().match(/^(\d+)\s+(.+)$/);
      if (match && match[2]) {
        content += `- \`${match[2]}\` (${match[1]} changes)\n`;
        itemCount++;
      }
    }
  }

  // Recent activity
  const recentCommits = run(
    'git log --oneline -10 --format="%h %s"',
    targetDir
  );
  if (recentCommits) {
    content += `\n### Recent Commits\n\n`;
    for (const line of recentCommits.split("\n").filter(Boolean)) {
      content += `- ${line}\n`;
      itemCount++;
    }
  }

  return { section: "git", content, itemCount };
}
