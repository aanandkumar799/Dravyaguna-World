import { execFileSync } from "node:child_process";

const changed = execFileSync(
  "git",
  ["diff", "--name-only", "--diff-filter=ACMR", "HEAD^", "HEAD"],
  { encoding: "utf8" },
)
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean)
  .filter((file) => /\.(?:js|jsx|mjs|cjs|ts|tsx|json|md|mdx|css|yml|yaml)$/.test(file));

if (!changed.length) {
  console.log("No changed files require Prettier validation.");
  process.exit(0);
}

execFileSync("pnpm", ["exec", "prettier", "--check", ...changed], { stdio: "inherit" });
