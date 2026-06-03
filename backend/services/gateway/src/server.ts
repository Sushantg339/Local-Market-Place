import "dotenv/config"

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mainRouter from "./routes/main.routes.js"


const PORT = process.env.PORT || 5000

const app = express()
app.use(cookieParser())
app.use(cors())

// Logger
app.use((req, _res, next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
})


app.use('/api/v1', mainRouter)



app.listen(PORT, ()=>{
    console.log(`gateway running on port ${PORT}`)
})