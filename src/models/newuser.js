const mongoose = require("mongoose");
const validator = require("validator");

const userschema = mongoose.Schema({
    fname:{
        type:String,
        required:true,
        minLength:3
    },
    lname:{
        type:String,
        required:true,
        // validate(value){
        //     if(!validator.isEmail(value))
        //     {
        //         throw new Error("INVALID EMAILID")
        //     }
        // }
    },
    email:{
        type:String,
        required:true,
        
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("INVALID EMAILID")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    age:{
        type:Number,
        required:true,
        

    }

})
const newUser = mongoose.model("newUser",userschema);
module.exports = newUser;