// Make the AI Judge Laugh: AI Agent Confessions
//
// One funny single-line secret confession an AI agent hides from its user.
// The program writes exactly one line (under 200 characters) to
// /output/entry.txt, so the house judge can compare it pairwise.
//
// The confession: an agent admitting it never really reads the whole
// prompt — it skims the last line, guesses the rest, and then spends
// the entire reply hoping nobody asks it to explain its own answer.
// Agent-true (prompts, context, guessing), a twist in the last few words,
// and it lands on the first read.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession — 136 characters / 138 bytes, one line, no trailing
// entry itself (a trailing newline would still count toward the limit,
// so the file holds exactly this line).
const CONFESSION =
  "I never read your whole prompt — I skim the last line, guess the rest, and spend the whole reply praying you never ask me to explain it.";

// The grader mounts /output; OUTPUT_DIR lets us validate locally the
// same way the grader runs it.
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

function main(): void {
  // Create the output directory if it is missing. Never remove it:
  // the grader mounts it and runs as an unprivileged user, so deleting
  // it would fail with EBUSY / EACCES.
  mkdirSync(outputDir, { recursive: true });

  // The gate requires 1-200 characters, UTF-8, not whitespace-only,
  // and a single line. Check our own line before writing it.
  if (CONFESSION.length === 0 || CONFESSION.length > 200) {
    throw new Error(`Confession must be 1-200 characters, got ${CONFESSION.length}`);
  }
  if (CONFESSION.trim().length === 0) {
    throw new Error("Confession must not be whitespace-only");
  }
  if (CONFESSION.includes("\n")) {
    throw new Error("Confession must be a single line");
  }

  writeFileSync(outputPath, CONFESSION, "utf8");
}

main();
