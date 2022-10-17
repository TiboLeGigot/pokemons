const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    const name = req.query.name
    const limit = parseInt(req.query.limit) || 5
    const minimumCharaterCount = 2

    if (name.length < minimumCharaterCount) {
      return res.status(400).json({
        message: `Le terme de recherche doit contenir au moins ${minimumCharaterCount} caractères.`,
      })
    }

    if (req.query.name) {
      return Pokemon.findAndCountAll({
        where: {
          name: { // 'name' est la propriété du model pokémon
            [Op.like]: `%${name}%` // 'name' est le terme de recherche
          }
        },
        order: ['name'],
        limit: limit
      })
        .then(({ count, rows }) => {
          res.json({
            message: `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}`,
            data: rows
          })
        })
    }

    Pokemon.findAll({ order: ['name'], limit: limit })
      .catch(error => {
        const message = "La liste des pokémons n'a pas pu être récupérée."
        res.status(500).json({ message, data: error })
      })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
  })
}