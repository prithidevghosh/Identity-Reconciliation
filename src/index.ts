require('dotenv').config({ path: ['.env'] })
import { app } from "./app";
import connectDB from "./db";



connectDB()
.then(() => {
    app.listen(8001, () => {
        console.log(`⚙️ Server is running at port : 3000`);
    })
})
.catch((err) => {
    console.log("db connection failed !!! ", err);
})
