const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/websitedb",
{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log(error);
})