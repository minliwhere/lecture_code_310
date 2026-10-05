import * as fs from "fs";
import * as path from "path";
import { MyWrapped } from "./MyWrapped";

const read = (file: string) => fs.readFileSync(path.join(__dirname, "data", file), "utf-8");

const wrapped = new MyWrapped(read("spotify_plays.json"), read("apple_plays.csv"));
wrapped.reportTopArtists();
wrapped.reportTopGenres();
