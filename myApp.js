const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use((req, _res, next) => {
  const log = `${req.method} ${req.path} - ${req.ip}`

  console.log(log)
  next()
})

app.use("/public", express.static(`${__dirname}/public`))

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (_req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.get("/json", (_req, res) => {
  const message =
    process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json"

  res.json({ message })
})

app.get(
  "/now",
  (req, _res, next) => {
    req.time = new Date().toString()
    next()
  },
  (req, res) => {
    const { time } = req

    res.json({ time })
  },
)

app.get("/:word/echo", (req, res) => {
  const { word } = req.params

  res.json({ echo: word })
})

app.get("/name", (req, res) => {
  const { first, last } = req.query

  res.json({ name: `${first} ${last}` })
})

app.post("/name", (req, res) => {
  const { first, last } = req.body

  res.json({ name: `${first} ${last}` })
})

module.exports = app
