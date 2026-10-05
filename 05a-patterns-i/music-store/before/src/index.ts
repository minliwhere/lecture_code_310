import * as fs from "fs";
import * as path from "path";
import { parseCSV } from "./utils/csvParser";

// ─── LOAD DATA ─────────────────────────────────────────────────────────────────

const streamingRaw: any[] = JSON.parse(fs.readFileSync(path.join(__dirname, "data/streaming_records.json"), "utf-8"));

const inventoryRaw: any[] = parseCSV(fs.readFileSync(path.join(__dirname, "data/inventory_records.csv"), "utf-8"));

// ─── DISPLAY ───────────────────────────────────────────────────────────────────

console.log("=".repeat(60));
console.log("  🎵 Music Store Catalog");
console.log("=".repeat(60));

// ─── Streaming API records ──────────────────────────────────────────────────
for (const record of streamingRaw) {
	const durationSeconds = Math.floor(record.duration_ms / 1000); // ms → seconds
	const mins = Math.floor(durationSeconds / 60);
	const secs = durationSeconds % 60;
	const duration = `${mins}:${secs.toString().padStart(2, "0")}`;

	console.log(`\n[Streaming API]`);
	console.log(`  ID:     ${record.record_id}`);
	console.log(`  Title:  ${record.title}`);
	console.log(`  Artist: Weird Al`); // TODO: fill in with the actual author from the record!
	console.log(`  Year:   ${new Date(record.released_on).getFullYear()}`); // ISO date → year
	console.log(`  Length: ${duration}`);
	console.log(`  Genre:  ${record.metadata.primary_genre}`); // buried inside metadata
}

// ─── Inventory System records ───────────────────────────────────────────────
// This is an example usage, but you can imagine other consumers would write similar code!

for (const record of inventoryRaw) {
	const [min, sec] = record.Runtime.split(":").map(Number); // "MM:SS" → seconds
	const durationSeconds = min * 60 + sec;
	const mins = Math.floor(durationSeconds / 60);
	const secs = durationSeconds % 60;
	const duration = `${mins}:${secs.toString().padStart(2, "0")}`;

	console.log(`\n[Inventory System]`);
	console.log(`  ID:     ${record.SKU}`); // field: SKU
	console.log(`  Title:  ${record.Album_Title}`); // field: Album_Title
	console.log(`  Artist: Weird Al`); // TODO: fill in with the actual author from the record!
	console.log(`  Year:   ${parseInt(record.Release_Year, 10)}`);
	console.log(`  Length: ${duration}`);
	console.log(`  Genre:  ${record.Category}`); // field: Category
}

console.log("\n" + "=".repeat(60));
console.log(`  Total records loaded: ${streamingRaw.length + inventoryRaw.length}`);
console.log("=".repeat(60));
