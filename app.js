const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))

app.get('/', (req, res) => res.send('Hello again, Express !'))

// On retourne la liste des pokémons au format JSON, avec un message :
app.get('/api/pokemons', (req, res) => {
    const message = 'La liste des pokémons a bien été récupérée.'
    res.json(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
