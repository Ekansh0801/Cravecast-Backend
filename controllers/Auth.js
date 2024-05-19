const mongoose = require('mongoose')
const User = require('../models/User')
const Profile = require('../models/Profile')
const OTP = require('../models/OTP')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const otpGenerator = require('otp-generator')

//signup controller
exports.signup = async(req,res) => {
    try{
        //exract data from request body
        const {firstName,lastName,contactNumber,email,password,confirmPassword,accountType,otp} = req.body;
        //validation of data
        if(!firstName || !lastName || !contactNumber || !email || !password || !confirmPassword || !accountType || !otp){
            return res.status(403).json({
                success:false,
                message:'All Fields Required!!!',
            })
        }
        //check password and confirm password
        if(password != confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password does not match!!!",
            })
        }
        //check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists, login to continue!!!'
            })
        }
        //Find most recent OTP for email
        const response = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        //otp not found in DB
        if(response.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found!!",
            })
        }
        //OTP does not match
        else if(otp != response[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP!!"
            })
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //const profileDetails = await Profile
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
        })
        //create entry of user in database
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType:acccountType,
            additionalDetails:profileDetails._id,
        })
        //return successfull reponse
        return res.satus(200).json({
            success:true,
            user,
            message:'User registered successfully!!!',
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered "

        })
    }
}

//login controller with jwt token and cookies for authorization
exports.login = async(req,res) => {
    try{
        //fetch data from req body
        const {email,password} = req.body;
        //validate data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:`All Fields Requirement!!!`,
            })
        }
        //Find user with provided email
        const user = await User.findOne({email});
        
        //user not find
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User not rigistered!!!',
            })
        }
        //generate jwt token
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                {email:user.email,id:user._id,role:user.accountType},
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            )
            user.token = token
            user.password = undefined

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:'Login successfull!!',
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:`Password is incorrect!!!`
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`Login Failiure try again!!`
        })
    }
}

// controler for sending OTP for signup

exports.sendotp = async(req,res) => {
    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:`User already registerd`
            })
        }

        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:true,
        })

        const result = await OTP.findOne({otp:otp})
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:true,
            })
            result = await OTP.findOne({otp:otp});
        }
        const otpPayload = {email,otp}
        const otpBod = await OTP.create(otpPayload)
        res.status(200).json({
            success:true,
            message:`OTP sent successfully!!!`,
            otp,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'error sending OTP'
        })
    }
}

//controller for changing passsword
exports.changePassword= async(req,res) => {
    try{
        const userDetails = await User.findById(req.user.id)

        const {oldPassword,newPassword,confirmNewPassword} = req.body;

        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:`All fields required!!`
            })
        }
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:`new password and confirm new password does not match!!!`
            })
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password)

        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:'Old Password is incorrect'
            })
        }



        const encryptedPassword = await bcrypt.hash(newPassword,10);
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,{password:encryptedPassword},{new:true});

        return res.status(200).json({
            suuccess:true,
            message:`Password updated!!!`,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error updating password!!!"
        })
    }
}