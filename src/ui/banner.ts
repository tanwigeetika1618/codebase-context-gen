import figlet from "figlet";
import gradient from "gradient-string";
import chalk from "chalk";

export async function showBanner(): Promise<void> {
  const ascii = figlet.textSync("ctx-gen", {
    font: "ANSI Shadow",
    horizontalLayout: "fitted",
  });

  console.log(gradient(["#00d4ff", "#7b2ff7", "#ff2d95"])(ascii));
  console.log(
    chalk.gray("  🧠 Zero-token codebase context for AI agents\n")
  );
}
