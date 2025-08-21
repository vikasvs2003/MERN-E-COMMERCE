import { configDotenv } from "dotenv";
import handleAsyncError from "../middleware/handleAsyncError.js";
import User from '../models/userModels.js'
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

import {v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

//REGISTER USER
export const registerUser = handleAsyncError(async (req, res, next) => {
    const { name, email, password ,avatar} = req.body;
    const myCloud= await cloudinary.uploader.upload(avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
    })
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })
     sendToken(user,200,res)
})


//LOGIN USER
export const loginUser = handleAsyncError(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HandleError("email or password can not be empty ", 400))
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new HandleError("inValid email or password", 401))
    }

    const isPasswordValid = await user.verifyPassword(password);
   

    if (!isPasswordValid) {
        return next(new HandleError("inValid email or password", 401));
    }

    sendToken(user,200,res)
 
})

//LOGOUT USER

export const logoutUser = handleAsyncError(async (req, res, next) => {
    res.cookie('token',null,{
    expires : new Date(Date.now()),
    httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"successfully logged out"
    }) 
})


//FORGOT PASSWORD
export const requestPasswordReset = handleAsyncError(async(req,res,next)=>{
    const {email}= req.body
    const user = await User.findOne({email});

    if(!user){
        return next(new HandleError("user does not exist",400))
    }

    let resetToken;
    try{
        resetToken=user.generatePasswordResetToken()
       
        await user.save({
            validateBeforeSave:false
        })
    }catch(error){
        // console.log(" error ",error);
        return next(new HandleError("could not dave reset token please try again later",500))
    }

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/reset/${resetToken}`;
    const message = ` use the follwing link to reset Your Password : ${resetPasswordUrl} . \n\n this link will expire in 30 minutes . \n\n if you dod not request a password reset please ignore this message.`;
    try{
        //send email function
        await sendEmail({
            email:user.email,
            subject:'Password Reset Request',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email is sent to ${user.email} Successfully !!`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false})
        return next(new HandleError("Email could not be sent, please ! try later",500))
    }
    
})

//RESET PASSWORD
export const  resetPassword = handleAsyncError(async(req,res,next)=>{
    
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}

    })
    if(!user){
        return next(new HandleError("Reset Password token is invalid or has been expired",400))
    }
    const {password,confirmPassword} = req.body;
    if(password !== confirmPassword){
        return next(new HandleError("Password does not Match "))
    }
    user.password = password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);

})

//GETTING USER DETAILS
export const getUserDetails = handleAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    // console.log("GETTING USER DETAILS",req.user.id);

    res.status(200).json({
        success:true,
        user
    })
    
})

//UPDATE PASSWORD
export const updatePassword= handleAsyncError(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body;

    const user = await User.findById(req.user.id).select('+password');

    const checkPasswordMatch = await user.verifyPassword(oldPassword);

    if(!checkPasswordMatch){
        return next(new HandleError('Old Password is incorrect ',400))
    }

    if(newPassword !== confirmPassword){
        return next(new HandleError('passowrd does not match ',400))
    }
    user.password=newPassword;
    await user.save()
    sendToken(user,200,res);
})


//UPDATE PROFILE
export const updateProfile= handleAsyncError(async(req,res,next)=>{
   const {name,email,avatar} = req.body;
    const updateUserDetails={
        name,
        email
    }

if(avatar!==""){
    const user=await User.findById(req.user.id);
    const imageId=user.avatar.public_id
    await cloudinary.uploader.destroy(imageId)
    const myCloud=await cloudinary.uploader.upload(avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
    })

    updateUserDetails.avatar={
        public_id:myCloud.public_id,
        url:myCloud.secure_url,

    }
}
    const user = await User.findByIdAndUpdate(req.user.id , updateUserDetails , {
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        message:"Profile Update Successfully ",
        user
    })
})