const axios = require('axios');

const { db, apiBoardAtlas } = require('../../conf');

let myGames = [];
let totalGames = 0;

const scrapGames = async (recursive = false) => {
  try {
    // Fetchs data
    const { data } = await axios.get(
      `https://api.boardgameatlas.com/api/search?limit=100&skip=${myGames.length}&client_id=${apiBoardAtlas}`
    );

    // Clean up data
    const properGames = data.games.map((game) => {
      return [
        game.name || 'N/A',
        game.year_published || -1,
        game.min_players || -1,
        game.max_players || -1,
        game.min_playtime || -1,
        game.max_playtime || -1,
        game.min_age || -1,
        game.description?.replace(/(<([^>]+)>)/gi, '') || 'N/A',
        game.thumb_url || 'N/A',
        game.image_url || 'N/A',
        game.primary_publisher?.name || 'N/A',
        game.primary_designer?.name || 'N/A',
        game.artists[0] || 'N/A',
        game.official_url || 'N/A',
        game.num_user_ratings || 'N/A',
        game.average_user_rating || 'N/A',
      ];
    });

    myGames = [...myGames, ...data.games];
    totalGames = parseInt(data.count, 10);

    // Inserts into MySQL
    await db.query(
      'INSERT INTO games (name, published_at,min_players, max_players,min_playtime, max_playtime, min_age, description, thumb_url, image_url, publisher, designer, artist, official_url, nb_ratings, rating) VALUES ?',
      [properGames]
    );

    // Should keep going ?
    if (recursive && myGames.length < totalGames) {
      console.log(`Games: ${myGames.length}/${totalGames}, keep going...`);
      setTimeout(() => {
        scrapGames(recursive);
      }, 100);
    } else {
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

scrapGames(true);
process.exit();
