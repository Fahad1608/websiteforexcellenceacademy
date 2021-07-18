const express = require("express");
const path = require("path");
const hbs = require("hbs");
const accountSid = 'ACb79f07f5fb2c68f89f4bd64ce7358c92'; 
const authToken = '9c89098e9a902861068e71a0a6a432fb'; 
const client = require('twilio')(accountSid, authToken); 
const history = require('history');
const window= require('window');

require("./db/conn");
const User = require("./models/usermessage");
const newUser = require("./models/newuser");
const app = express();
const port = process.env.PORT || 3000;
const templateviews = path.join(__dirname,"../templates/views"); 
const templatepartials = path.join(__dirname,"../templates/partials");
const staticpath = path.join(__dirname,"../public");
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.set("view engine","hbs");
app.set("views",templateviews);
hbs.registerPartials(templatepartials);
app.get("/",(req,res)=>{
    
    res.render("login_signup");
    

    
   
})

app.get("/index",(req,res)=>{
    res.render("index");
})
app.post('/login',async(request,response)=>{
    try
    {
          const email = request.body.email;
          const password = request.body.password;
          const useremail= await newUser.findOne({email:email});
          
         
          if(useremail.password == password)
          {
              response.status(201).render("index");

          }
          else{
              response.send("match not matching");
          }
    }
    catch(error)
    {
         response.status(400).send("invalid email")
    }
});

app.get('/react', (request, response) => {
    response.redirect("https://reactjs.org/");
});
app.get('/angular', (request, response) => {
    response.redirect("https://docs.angularjs.org/tutorial");
});
app.get('/javascript', (request, response) => {
    response.redirect("https://www.javascript.com/");
});
app.get('/python', (request, response) => {
    response.redirect("https://www.python.org/");
});
app.get('/java', (request, response) => {
    response.redirect("https://www.javatpoint.com/java-tutorial");
});
app.get("/about",(req,res)=>{
    res.render("AboutInstitute");
})
app.get("/intro",(req,res)=>{
    res.render("AboutInstitutea");
})

app.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const useremail= await newUser.findOne({email:email});
    if(useremail == null){

        try{
            //res.send(req.body);
           const newuser = new newUser(req.body);
            await  newuser.save();
            res.status(201).render("index");
        }
        catch(error){
           res.status(500).send(error);
        }
    }
    else 
    {
        res.status(400).send("email already exist");
    }
    
    
})



app.post("/contactus",async (req,res)=>{
    try{
        //res.send(req.body);
       const userData = new User(req.body);
        await  userData.save();
        res.status(201).render("index");
    }
    catch(error){
       res.status(500).send(error);
    }
    const details = req.body;
   console.debug({details});
    const abc = new User(req.body);
    client.messages 
    .create({ 
       body:"Hi one user showed interest in joinig you live classes details are as follows \n"+"Name:- "+abc.name+"\n"+"Phone:-"+abc.phone+"\n"+"Email:-  "+abc.email+"\n"+"Message:  "+abc.message, 
       from: 'whatsapp:+14155238886',       
       to: 'whatsapp:+918420177445' 
     }) 
    .then(message => console.log(message.sid)) 
    .done();

})

app.listen(port,()=>{
    console.log('server started ${port}');
})
app.post("/index",async (req,res)=>{
    try{
        //res.send(req.body);
      
        res.status(201).render("AboutInstitute");
    }
    catch(error){
       res.status(500).send(error);
    }
    app.post("/about",async (req,res)=>{
        try{
            //res.send(req.body);
          
            res.status(201).render("AboutInstitutea");
        }
        catch(error){
           res.status(500).send(error);
        }})
        app.post("/home",async (req,res)=>{
            try{
                //res.send(req.body);
              
                res.status(201).render("index");
            }
            catch(error){
               res.status(500).send(error);
            }})
     
   

})


