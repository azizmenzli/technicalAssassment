const { Game } = require('./model');

const createGame = async (req, res) => {
    try {
      const game = new Game(req.body);
      await game.save();
      res.status(201).json(game);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const getGameById = async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getGames = async (req, res) => {
    try {
      const games = await Game.find();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateGameById = async (req, res) => {
    try {
      const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.json(game);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const deleteGameById = async (req, res) => {
    try {
      const game = await Game.findByIdAndDelete(req.params.id);
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  createGame,
  getGameById,
  getGames,
  updateGameById,
  deleteGameById
};
