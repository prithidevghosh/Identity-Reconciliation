require('dotenv').config({ path: ['.env'] })
import { app } from "./app";
import {connectDB} from "./db";



connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("db connection failed !!! ", err);
})
