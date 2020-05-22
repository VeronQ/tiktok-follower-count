const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const cors = require('cors')

const {getUserProfileInfo} = require('tiktok-scraper')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.get('/users/:id', async (req, res) => {
  await getUserProfileInfo(req.params.id)
    .then(data => data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err)
    })
})

module.exports = app
module.exports.handler = serverless(app)
