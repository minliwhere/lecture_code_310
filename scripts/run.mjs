// Usage: node scripts/run.mjs <mocha|prettier|ts-node|nyc|tsc> [args...]
// Runs the tool from the project directory `yarn` was run in. See tools.mjs.
import { run } from "./tools.mjs";

const [command, ...args] = process.argv.slice(2);
run(command, args);
