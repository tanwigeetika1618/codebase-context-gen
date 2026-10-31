#!/usr/bin/env node

import { Command } from "commander";
import { resolve } from "path";
import { showBanner } from "./ui/banner.js";
import { generateContext } from "./generator.js";

const program = new Command();

program
  .name("ctx-gen")
  .description(
    "Generate a compact AI-friendly context file from any codebase using static analysis"
  )
  .version("1.0.0")
  .argument("[directory]", "Path to the codebase to analyze", ".")
  .option("-o, --output <file>", "Output file path", ".ai-context.md")
  .option("-v, --verbose", "Show detailed analysis progress", false)
  .option("--no-git", "Skip git history analysis")
  .option("--no-types", "Skip TypeScript type analysis")
  .option("--max-depth <n>", "Max directory depth for tree", "6")
  .action(async (directory: string, options) => {
    await showBanner();
    const targetDir = resolve(directory);
    await generateContext(targetDir, {
      outputFile: options.output,
      verbose: options.verbose,
      analyzeGit: options.git !== false,
      analyzeTypes: options.types !== false,
      maxDepth: parseInt(options.maxDepth, 10),
    });
  });

program.parse();
