// src/index.ts
import { Elysia, t } from "elysia";
import { Genius } from "./instances/genius";

const app = new Elysia();

app.get("/", async ({ query }) => {
  if (!query.q) {
    return new Response('Missing query', { status: 400 });
  }

  const genius = new Genius()
  const song = await genius.searchSong(query.q)
  const lyrics = await genius.getLyrics(song?.url)
  return { song, lyrics }
}, { query: t.Object({ q: t.String() }) })
  .listen(Bun.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);