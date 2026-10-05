// TARGET INTERFACE — the canonical shape every data source is normalised into

export interface MusicRecord {
	id: string;
	track: string;
	artist: string;
	streams: number;
	genre: string;
}
