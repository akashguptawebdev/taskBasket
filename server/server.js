import app from "./app.js"


let PORT = process.env.PORT || 3500;


app.listen(PORT,()=>{
    console.log(`server is running on PORT: ${PORT}`)

 })