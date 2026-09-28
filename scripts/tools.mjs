// Runs the dev tools (mocha, prettier, ts-node, nyc, tsc) without a shell, so the root scripts behave
// the same in cmd.exe, PowerShell, and bash. Each tool is started as `node <its entry file>`, which avoids
// the shell scripts and .cmd wrappers in node_modules/.bin that differ between platforms.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// the project `yarn` was run from, e.g. 04a-testability2/
export const project = process.env.INIT_CWD ?? process.cwd();

// commands whose npm package has a different name
const PACKAGE_FOR = { tsc: "typescript" };

function entryFile(command) {
	const name = PACKAGE_FOR[command] ?? command;
	const dir = join(root, "node_modules", name);
	const { bin } = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
	return join(dir, typeof bin === "string" ? bin : bin[command]);
}

/** Runs `command args...` from the project directory, and exits with its status. */
export function run(command, args) {
	const result = spawnSync(process.execPath, [entryFile(command), ...args], { stdio: "inherit", cwd: project });
	if (result.error) throw result.error;
	process.exit(result.status ?? 1);
}
