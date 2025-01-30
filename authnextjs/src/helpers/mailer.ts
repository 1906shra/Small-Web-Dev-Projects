import nodemailer from 'nodemailer'
import User from '../models/userModel'
import bycryptjs from 'bcryptjs'


export const sendEmail  = async ({email,emailType,userId}:any)=>{
    try {
      const hashToken= await bycryptjs.hash(userId.toString(),10)

     if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userId,
            {
                verifyToken:hashToken,
                verifyTokenExpiry:Date.now()+3600000}
          )
     }
     else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,
            {
                forgortPasswordToken:hashToken,
                forgetPasswordTokenExpiry:Date.now()+3600000}
          )

          
     }

     var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5ce9a0f482b5bb",
          pass: "9a0f482b48d0"
          //todo add these credential to the env files

        }
     })

     const mailOptions = {
        from:'shraddhatripathi1906@gmail.com',
        to:email,
        subject:emailType === "VERIFY"?"Verify your email": "Reset your password",

        html:`<p>Click <a href = ${process.env.DOMAIN}/verifyemail?token=${hashToken} "verify your email": "reset your password 
        
        or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token = ${hashToken} 
        
        </p>  `
  


     }
     const mailresponse = await transport.sendMail(mailOptions);
     return mailresponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}

