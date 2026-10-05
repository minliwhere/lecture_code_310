import * as fs from "fs";
import * as path from "path";
import { parseCSV } from "./utils/csvParser";
import { MusicRecord } from "./MusicRecord";
import { spotifyAdapter, appleMusicAdapter } from "./adapters";

// ─── LOAD RAW DATA ─────────────────────────────────────────────────────────────

const spotifyRaw: any[] = JSON.parse(fs.readFileSync(path.join(__dirname, "data/spotify_plays.json"), "utf-8"));
const appleMusicRaw: Record<string, string>[] = parseCSV(
	fs.readFileSync(path.join(__dirname, "data/apple_plays.csv"), "utf-8")
);

// ─── ADAPT ─────────────────────────────────────────────────────────────────────
// Each source gets one adapter. Adding YouTube Music = one new class + one line here.
const spotifyData = spotifyRaw.map(spotifyAdapter);
const appleMusicData = appleMusicRaw.map(appleMusicAdapter);
const allRecords: MusicRecord[] = spotifyData.concat(appleMusicData);

// ─── MY WRAPPED ────────────────────────────────────────────────────────────────
// No format-specific field names here — every method works the same way
// regardless of how many sources are in the adapters array above.

class MyWrapped {
	reportTopArtists(): void {
		console.log("=".repeat(60));
		console.log("  🎤 Your Top Artists");
		console.log("=".repeat(60));

		const counts: Record<string, number> = {};
		for (const record of allRecords) {
			counts[record.artist] = (counts[record.artist] ?? 0) + record.streams;
		}

		const top5 = Object.entries(counts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5);

		for (const [artist, total] of top5) {
			console.log(`  ${artist.padEnd(30)} ${total.toLocaleString()} streams`);
		}
		console.log();
	}

	reportTopGenres(): void {
		console.log("=".repeat(60));
		console.log("  🎵 Your Top Genres");
		console.log("=".repeat(60));

		const counts: Record<string, number> = {};
		for (const record of allRecords) {
			counts[record.genre] = (counts[record.genre] ?? 0) + record.streams;
		}

		const top5 = Object.entries(counts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5);

		for (const [genre, total] of top5) {
			console.log(`  ${genre.padEnd(30)} ${total.toLocaleString()} streams`);
		}
		console.log();
	}
}

// ─── RUN ───────────────────────────────────────────────────────────────────────

const wrapped = new MyWrapped();
wrapped.reportTopArtists();
wrapped.reportTopGenres();
