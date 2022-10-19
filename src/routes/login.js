const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
  app.post('/api/login', (req, res) => {

    User.findOne({ where: { username: req.body.username } })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }

        bcrypt.compare(req.body.password, user.password)
          .then(isPasswordValid => {
            if (!isPasswordValid) {
              return res.status(401).json({ message: `le mot de passe est incorrect` })
            }

            // JWT 
            const token = jwt.sign(
              { userId: user.id },
              privateKey,
              { expiresIn: '24h' }
            )

            res.json({
              message: `L'utilisateur a été connecté avec succès`,
              data: user,
              token
            })
          })
      })
      .catch(error => {
        return res.status(401).json({ message: `l'utilisateur n'a pas pu être connecté, réessayez dans quelques instants.`, data: error })
      })
  })
}