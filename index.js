import express from "express"
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
const PORT=process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`the server is running on the port ${PORT}`);
})