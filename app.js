const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

// sequelize.initDb()

app.get('/', (req, res) => {
    return res.json('Hello Heroku !')
})

// Endpoints
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk.js')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// Errors
app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée."
    res.status(404).json({ message });
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
