// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let lastfm_tracks = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USERNAME}&api_key=${process.env.LASTFM_KEY}&limit=5&format=json`)
  let tracks = await lastfm_tracks.json();

  let lastfm_albums = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${process.env.LASTFM_USERNAME}&api_key=${process.env.LASTFM_KEY}&limit=5&format=json`)
  let albums = await lastfm_albums.json();

  res.statusCode = 200;
  res.json({tracks, albums});
}
