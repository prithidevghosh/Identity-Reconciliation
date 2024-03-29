import express, {Application, Request, Response} from "express";
import userRouter from "./routes/identify";

const app:Application = express()

app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.get("/",(req: Request,res:Response)=>{
     return res.redirect("https://www.youtube.com/watch?v=h9QNUcrjtOs")
})
app.use("/api/v1/identify", userRouter)


export {app}