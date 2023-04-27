const express=require('express')
const cors =require('cors')
const {connect}=require('./database')

const {createGame,
    getGameById,
    getGames,
    updateGameById,
    deleteGameById}=require('./crud')

const {select_top_by_playtime,
    select_top_by_players}=require('./query')

const app =express()
const PORT =3001
connect()

app.use(express.json())
app.use(cors())

app.post('/games',createGame)
app.get('/games/:id',getGameById)
app.get('/games',getGames)
app.put('/games/:id',updateGameById)
app.delete('/games/:id',deleteGameById)


app.get('/top-by-playtime', async (req, res) => {
    const options = {};
    if (req.query.genre) {  
      options.genre = req.query.genre;
    }
    if (req.query.platform) {
      options.platform = req.query.platform;
    }
    const games = await select_top_by_playtime(options);
    res.json(games);
  });

app.get('/top-by-players', async (req, res) => {
    const options = {};
    if (req.query.genre) {
      options.genre = req.query.genre;
    }
    if (req.query.platform) {
      options.platform = req.query.platform;
    }
    const games = await select_top_by_players(options);
    res.json(games);
  });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });