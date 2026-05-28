import express from "express"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)

app.use(errorHandler)

export default app