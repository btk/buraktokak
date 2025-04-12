// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function steamFetch(type) {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${process.env.STEAM_ID}&include_appinfo=true&include_played_free_games=true&format=json`
    );
    
    if (!response.ok) {
      throw new Error(`Steam API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.response || !data.response.games) {
      throw new Error('Invalid response from Steam API');
    }

    // Sort games by playtime
    const sortedGames = data.response.games.sort((a, b) => b.playtime_forever - a.playtime_forever);
    
    // Format the games data
    const formattedGames = sortedGames.slice(0, 6).map(game => ({
      id: game.appid,
      name: game.name,
      image: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
      url: `https://store.steampowered.com/app/${game.appid}`,
      playtime: game.playtime_forever
    }));

    return formattedGames;
  } catch (error) {
    console.error('Error fetching Steam games:', error);
    return [];
  }
}

export default async function handler(req, res) {
  try {
    const games = await steamFetch();
    
    // Split into most played and last played (for now, we'll use the same data)
    const most_played = games;
    const last_played = games;

    res.status(200).json({ last_played, most_played });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Failed to fetch games data' });
  }
}
