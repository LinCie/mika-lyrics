import got from "got";
import * as cheerio from "cheerio";
import type { GeniusApiResponse } from "../types/geniusapiresponse";

class Genius {
  public readonly key: string | undefined;

  constructor() {
    this.key = Bun.env.GENIUS_KEY;
  }

  public async searchSong(query: string) {
    const URI = encodeURI(query);
    try {
      const response = await got
        .get(`https://api.genius.com/search?q=${URI}`, {
          headers: { Authorization: `Bearer ${this.key}` },
        })
        .json<GeniusApiResponse>()
      const song = response.response.hits.shift();
      return song?.result;
    } catch (error) {
      throw new Error("Error while fetching lyrics");
    }
  }

  public async getLyrics(url: string | undefined) {
    if (!url) return "Lyrics not found"

    const response = await got.get(url)

    const $ = cheerio.load(response.body);

    const lyrics = $('div[data-lyrics-container="true"]').html();

    const cleanedLyrics = lyrics?.replace(/<br>/g, '\n')
      .replace(/<.*?>|<a.*?>|<\/a>|<span.*?>|<\/span>|style=".*?"|class=".*?"|tabindex=".*?"|href=".*?"/g, '').trim()

    return cleanedLyrics
  }
}
export { Genius };