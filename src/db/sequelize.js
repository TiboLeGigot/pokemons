const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

let sequelize

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
        'axo2eyxtjdouy4a0',
        'adwjc9t1l62otmhm',
        'dk54mcb4kppzwlti',
        {
            host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: true
        }
    )
} else {
    sequelize = new Sequelize(
        'pokedex',
        'root',
        'root',
        {
            host: 'localhost',
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: false
        }
    )
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync().then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON().name))
        })

        bcrypt.hash('pikachu', 10)
            .then(hash => {
                User.create({
                    username: 'pikachu',
                    password: hash
                })
                    .then(user => console.log(user.toJSON()))
            })

        console.log(`La base de donnée a bien été initialisée avec ${pokemons.length} pokémons.`)
    })
}

module.exports = {
    initDb, Pokemon, User
}