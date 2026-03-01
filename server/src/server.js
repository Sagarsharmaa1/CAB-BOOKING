import express from "express"
const app = express();


app.get('/',(req,res)=>{
    res.send("server is working")
})

const port = 3000;
app.listen(port , ()=>{
    console.log(`App is on port ${port}`)
})
