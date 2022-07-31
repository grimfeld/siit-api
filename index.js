const express = require("express")
const services = require("./services.json")
const users = require("./users.json")
const cors = require("cors")
const app = express()
// const Bundler = require("parcel-bundler");
// const bundler = new Bundler("src/index.html", { logLevel: 2 });

const PORT = 3001

app.use(cors())

app.get('/services.json', (req, res) => {
  res.json(services)
})

app.get('/users.json', (req, res) => {
  let filteredUsers = users.map((user, i) => {
    const id = i + 1
    return { id, avatar_url: `https://eu.ui-avatars.com/api/?name=${user.name}`, ...user }
  })

  if (req.query.service_id) {
    filteredUsers = filteredUsers.filter((u) => u.service_ids.includes(parseInt(req.query.service_id)))
  }

  res.json(filteredUsers)
})

app.use(express.static("api/public"))
// app.use(bundler.middleware());

app.listen(PORT, () => {
  // Clear console
  process.stdout.write(
    process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H"
  )

  console.log("\x1b[32m%s\x1b[0m", "App started successfully!")
  console.log()
  console.log("You can now view it in your browser.")
  console.log()
  console.log(`  http://localhost:${PORT}`)
  console.log()
  console.log("You'll find more instruction in the README file.")
})
