// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let lastfm = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${process.env.LASTFM_USERNAME}&api_key=${process.env.LASTFM_KEY}&limit=5&format=json`)
  let tracks = await lastfm.json();
  res.statusCode = 200;
  res.json(tracks);
}
