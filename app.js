import express from "express";
import { PORT } from './config/env.js'
import connectToDatabase from "./database/mongodb.js"
import { authRouter, subscriptionRouter, userRouter, adminRouter} from './routes/index.js'
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import workflowRouter from "./routes/workflow.route.js";

const app = express()


// Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(arcjetMiddleware);
app.use(cookieParser())



// Prependings for separate routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflows', workflowRouter)

app.use(errorMiddleware);

app.get("/", (req, res)=>{
    res.send("TRACK YOUR SUBSCRIPTIONS") 
})

app.listen(PORT, async ()=>{
    console.log('App running on port http://localhost:' + PORT);

    await connectToDatabase();
})


export default app;