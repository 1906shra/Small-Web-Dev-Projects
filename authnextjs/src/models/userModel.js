import mongoose  from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema = new mongoose.Schema({
   username:{
    type:String,
    required:[true,"Please provide a username"],
    unique:true,
   },

   email:{
        type:String,
        required:[true,"please provide a email"],
        unique:true,
   },

   password:{
       type:String,
       required:[true,"please provide a password"],
   },

   isVerified :{
       type:Boolean,
       default:false,
   },
   isAdmin:{
    type:Boolean,
    default:false,
   },

   forgortPasswordToken: String,
   forgetPasswordTokenExpiry: Date,
   verifyToken:String,
   verifyTokenExpiry:Date

})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User