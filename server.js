const express = require("express");
const path = require("path");
const Rollbar = require("rollbar")

const app = express();
app.use(express.json())


let rollbar = new Rollbar({
  accessToken: "fa6291d24ead4fe5a4039e5c5f12e4f9",
  captureUncaught: true,
  captureUnhandledRejections: true
  
})


// record a generic message and send it to Rollbar


app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/error",(req,res) => {
  try {
    nonExistentFunction();
  } catch (error) {
    rollbar.error('that didnt work ')
    // console.error(error);
    
  }})
  app.post("/bad",(req,res) => {
    let {color} = req.body
    try{
      res.status(200).send(colors)
      
    }catch(error){
      rollbar.critical('value not found')
    }
  })
  app.post("/hello",(req,res) => {
    let {word} = req.body
    if (word === "world"){
      res.status(200).send(word)
    }else{
      rollbar.warning("that was the wrong value in the object")
    }
    
      rollbar.critical('value not found')
  })

app.use(rollbar.errorHandler())
const port = process.env.PORT || 4545;
app.listen(port, () =>{
  console.log(`server is up on ${port}!`)
})