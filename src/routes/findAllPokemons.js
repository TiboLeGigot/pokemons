const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .catch(error => {
          const message = "La liste des pokémons n'a pas p être récupérée."
          res.status(500).json({message, data: error})
      })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
  })
}