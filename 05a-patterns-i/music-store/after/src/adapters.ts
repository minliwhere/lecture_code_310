import { MusicRecord, MusicSource } from "./MusicSource";
import { parseCSV } from "./utils/csvParser";

export class SpotifySource implements MusicSource {
	private plays: any[];

	constructor(json: string) {
		this.plays = JSON.parse(json);
	}

	getRecords(): MusicRecord[] {
		return this.plays.map((play) => ({
			id: play.stream_id,
			track: play.track,
			artist: play.artist_name,
			streams: play.play_count,
			genre: play.metadata.genre,
		}));
	}
}

export class AppleMusicSource implements MusicSource {
	private plays: Record<string, string>[];

	constructor(csv: string) {
		this.plays = parseCSV(csv);
	}

	getRecords(): MusicRecord[] {
		return this.plays.map((play) => ({
			id: play.ID,
			track: play.Song,
			artist: play.By,
			streams: parseInt(play.Streams, 10),
			genre: play.Style,
		}));
	}
}
