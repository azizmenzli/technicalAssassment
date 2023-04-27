const { Game } = require('./model');

async function select_top_by_playtime(options) {
  const { genre, platform } = options;
  const query = Game.aggregate([
    { $match: { genre, platforms: platform } },
    {
      $group: {
        _id: '$game',
        totalPlaytime: { $sum: '$playTime' },
      },
    },
    { $sort: { totalPlaytime: -1 } },
  ]);
  const results = await query.limit(10);
  return results;
}

async function select_top_by_players(options) {
  const { genre, platform } = options;
  const query = Game.aggregate([
    { $match: { genre, platforms: platform } },
    {
      $group: {
        _id: '$game',
        uniquePlayers: { $addToSet: '$userId' },
      },
    },
    { $project: { game: '$_id', _id: 0, playerCount: { $size: '$uniquePlayers' } } },
    { $sort: { playerCount: -1 } },
  ]);
  const results = await query.limit(10);
  return results;
}

module.exports = {
  select_top_by_playtime,
  select_top_by_players
};
