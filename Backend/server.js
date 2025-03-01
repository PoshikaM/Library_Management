const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const authenticateAPI = require("./Middleware/authAPIKey")

const bookRoute = require("./Routes/bookRoutes")
const memberRoute = require("./Routes/memberRoute")
const issuanceRoute = require("./Routes/issuanceRoute")
const taskRoute = require("./Routes/tasksRoute")

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use(authenticateAPI)

app.use("/book", bookRoute)
app.use("/member", memberRoute)
app.use("/issuance", issuanceRoute)
app.use("/task", taskRoute)

app.listen(PORT, () => {
    console.log(`PORT ${PORT} is working fine`)
})