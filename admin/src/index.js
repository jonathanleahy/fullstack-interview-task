const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/export", (req, res) => {

  const contentType = "application/json"
  const payload = "{\"name\":\"John\", \"age\":30}"

  request.post({
    headers: {"Content-Type": `${contentType}`},
    url: `${config.investmentsServiceUrl}/investments/export`,
    body: payload
    ,
  }, (e) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send("Done")
    }
  })
})

app.get("/investments/:id", (req, res) => {
  const {id} = req.params
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send(investments)
    }
  })
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
