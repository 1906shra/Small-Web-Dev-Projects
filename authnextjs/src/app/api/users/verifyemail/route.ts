import { connect } from "@/dbconfig/dbconfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";

connect()
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody
        console.log(token);

    const user=   await User.findOne({
            verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()}
        })

        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        console.log(user);
        user.isverified = true,
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()
        return NextResponse.json({message:"Verification successful",
            sucess:true
        },{status:400})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}