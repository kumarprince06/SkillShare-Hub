const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

const connectMongoDB = require('./config/DDConfig')
const router = require('./routes/routes')

const app = express()
app.use(cors({
  origin : process.env.FRONTEND_URL,
  methods :['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials : true,
}))

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use("/api",router)

const PORT = 8080
connectMongoDB().then(() =>{
  app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running at ${PORT}`)
  })
})