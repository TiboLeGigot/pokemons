const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if (pokemon === null) {
          return res.status(404).json({ message: "Le pokémon demandé n'existe pas, réesayez avec un nouvel identifiant" })
        }

        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        res.status(500).json({ message, data: "Le pokémon n'a pas pu être récupéré" })
      })
  })
}