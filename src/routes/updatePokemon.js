const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return Pokemon.findByPk(id).then(pokemon => {
                    if (pokemon === null) {
                        return res.status(404).json({ message: "Le pokémon demandé n'existe pas, réesayez avec un nouvel identifiant" })
                    }

                    res.json({ message: `Le pokémon ${pokemon.name} a bien été modifié.`, data: pokemon })
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                  }
                res.status(500).json({ message: "Le pokémon n'a pas pu être modifié", data: error })
            })
    })
}