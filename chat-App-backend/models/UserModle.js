import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose"

const userschema =mongoose.Schema({
    email:{
        type: String,
        required: [true,"Email is required"],
        unique:true,
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        unique:false,
    },
    firstName:{
        type: String,
        required: false,
    },
    lastName:{
        type: String,
        required: false,
    },
    image:{
        
        type: String,
        required: false,
    },
    colour:{
        
        type: String,
        required: false,
    },
    profileSetup:{
        
        type: Boolean,
        default: false,
    }
});

userschema.pre("save",async function (next) {
    const salt = await genSalt();
    this.password=await hash(this.password,salt);
    next();
    
})

const User = mongoose.model("Modle",userschema);

export default User;

