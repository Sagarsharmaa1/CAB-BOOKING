import express from "express"
import path from "path"
import { ENV } from "./lib/env.js";
import cors from 'cors';

const app = express();
const __dirname = path.resolve()


app.use(cors({
    origin:ENV.CLIENT_URL, credentials:true
}))

app.get('/',(req,res)=>{
    res.send("server is working")
})


//make our app ready for deployment 
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../client/dist")))

    app.get("/{*any}",(req , res)=>{
        res.sendFile(path.join(__dirname,"../client/dist"))
    })
}

const port = ENV.PORT;
app.listen(port , ()=>{
    console.log(`App is on port ${port}`)
})
