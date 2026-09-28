// Type-checks only the project `yarn build` was run from, using the root tsconfig.
// tsc can't narrow `include` from the command line, so write a small config that extends
// the root one. It lives under node_modules/ so tsc still finds node_modules/@types.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, sep } from "node:path";
import { project, root, run } from "./tools.mjs";

// tsconfig globs need forward slashes, even on Windows
const slashes = (path) => path.split(sep).join("/");

const cacheDir = join(root, "node_modules", ".cache", "typecheck");
const config = join(cacheDir, "tsconfig.json");

mkdirSync(cacheDir, { recursive: true });
writeFileSync(
	config,
	JSON.stringify({
		extends: slashes(join(root, "tsconfig.json")),
		include: [slashes(join(project, "src/**/*.ts")), slashes(join(project, "test/**/*.ts"))],
	})
);

run("tsc", ["-p", config]);
