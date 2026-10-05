import { MusicRecord } from "./MusicRecord";

export function appleMusicAdapter(play: Record<string, string>): MusicRecord {
	return {
		id: play.ID,
		track: play.Song,
		artist: play.By,
		streams: parseInt(play.Streams, 10),
		genre: play.Style,
	};
}

export function spotifyAdapter(play: any): MusicRecord {
	return {
		id: play.stream_id,
		track: play.track,
		artist: play.artist_name,
		streams: play.play_count,
		genre: play.metadata.genre,
	};
}
