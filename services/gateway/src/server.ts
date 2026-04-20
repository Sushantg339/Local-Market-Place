import "dotenv/config"
import express from "express"
import proxy from "express-http-proxy"

const PORT = process.env.PORT || 5000

const app = express()

app.use("/api/v1/auth", proxy("http://localhost:3001"))

app.listen(PORT, ()=>{
    console.log(`gateway running on port ${PORT}`)
})