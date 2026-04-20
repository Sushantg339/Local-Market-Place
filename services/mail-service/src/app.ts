import express from "express"
import mailRouter from "./routes/mail.routes.js"

const app = express()
app.use(express.json())


app.use('/', mailRouter)


export default app