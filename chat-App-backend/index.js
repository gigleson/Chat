import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import authRoute from "./routes/AuthRoutes.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const databaseUrl= process.env.DATABASE_URL;

app.use(cors(
    {
        origin: [process.env.ORIGIN],
        methods: ["GET","POST","PUT","PATCH","DELETE"],
        credentials: true
    }
));

app.use(cookieParser());


app.use(express.json()); 
app.use("/uploads/profiles",express.static("uploads/profiles"));

app.use("/api/auth",authRoute)

const server =app.listen(port,(req,res) => {
    console.log(`Server is running in localhost${port} `);
})

mongoose.connect(databaseUrl)
    .then(()=>{
        console.log("database connected")
    })
    .catch((error) => { 
        console.log(error.message)
     })