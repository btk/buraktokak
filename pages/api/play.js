// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function steamFetch(type){
  let steam = await fetch(`https://steamcommunity.com/id/${process.env.STEAM_ID}/games/?tab=${type}`)
  let steamText = await steam.text();
  let games = steamText.split(`var rgGames = `)[1].split(`;`)[0];

  return JSON.parse(games).slice(0,6);
}

export default async function handler(req, res) {
  let last_played = await steamFetch("recent");
  let most_played = await steamFetch("all");

  res.statusCode = 200;
  res.json({last_played, most_played});
}
