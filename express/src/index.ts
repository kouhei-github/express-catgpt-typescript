import express from "express"
import cors from "cors"
import * as http from 'http'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import * as process from 'process'
import mongoose from 'mongoose'
import router from './router'


const app = express()
app.use(cors({
  credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8000, () => {
  console.log("Server running")
})

const username = process.env.USERNAME
const password = process.env.PASSWORD
const host = process.env.HOST
const mongo_url = `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority`

mongoose.Promise = Promise
mongoose.connect(mongo_url)
mongoose.connection.on("error", (error: Error) => console.log(error))

app.use("/api/", router())

