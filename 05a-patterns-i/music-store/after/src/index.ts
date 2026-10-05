import * as fs from "fs";
import * as path from "path";
import { MyWrapped } from "./MyWrapped";
import { SpotifySource, AppleMusicSource } from "./adapters";

const read = (file: string) => fs.readFileSync(path.join(__dirname, "data", file), "utf-8");

const wrapped = new MyWrapped([
	new SpotifySource(read("spotify_plays.json")),
	new AppleMusicSource(read("apple_plays.csv")),
]);
wrapped.reportTopArtists();
wrapped.reportTopGenres();
