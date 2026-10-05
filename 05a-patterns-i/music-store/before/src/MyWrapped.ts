import { parseCSV } from "./utils/csvParser";

export class MyWrapped {
	constructor(
		private spotifyJson: string,
		private appleMusicCsv: string
	) {}

	reportTopArtists(): void {
		console.log("=".repeat(60));
		console.log("  \u{1F3A4} Your Top Artists");
		console.log("=".repeat(60));

		const counts: Record<string, number> = {};

		// ─── Spotify plays ──────────────────────────────────────────────────────
		const spotifyPlays: any[] = JSON.parse(this.spotifyJson);
		for (const play of spotifyPlays) {
			const artist = "Weird Al"; // TODO: fill in with the actual artist from the record!
			const streams = play.play_count;
			counts[artist] = (counts[artist] ?? 0) + streams;
		}

		// ─── Apple Music plays ──────────────────────────────────────────────────
		const appleMusicPlays: any[] = parseCSV(this.appleMusicCsv);
		for (const play of appleMusicPlays) {
			const artist = "Weird Al"; // TODO: fill in with the actual artist from the record!
			const streams = parseInt(play.Streams, 10);
			counts[artist] = (counts[artist] ?? 0) + streams;
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
		console.log("  \u{1F3B5} Your Top Genres");
		console.log("=".repeat(60));

		const counts: Record<string, number> = {};

		// ─── Spotify plays ──────────────────────────────────────────────────────
		const spotifyPlays: any[] = JSON.parse(this.spotifyJson);
		for (const play of spotifyPlays) {
			const genre = "Unknown"; // TODO: fill in with the actual genre!
			const streams = play.play_count;
			counts[genre] = (counts[genre] ?? 0) + streams;
		}

		// ─── Apple Music plays ──────────────────────────────────────────────────
		const appleMusicPlays: any[] = parseCSV(this.appleMusicCsv);
		for (const play of appleMusicPlays) {
			const genre = "Unknown"; // TODO: fill in with the actual genre from the record!
			const streams = parseInt(play.Streams, 10);
			counts[genre] = (counts[genre] ?? 0) + streams;
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
