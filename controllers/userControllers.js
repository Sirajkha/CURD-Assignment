const userModels = require('../models/userSchema');
const emailValidators = require('email-validator');
const bcrypt = require('bcrypt');


/******************************************************
 * @register
 * @route /api/auth/register
 * @method POST
 * @description register function for creating new user
 * @body name, email, password, confirmPassword
 * @returns User Object
 ******************************************************/
const register = async(req,res, next) => {
    const {name,email,password,confirmPassword} = req.body;
    console.log(name,email,password,confirmPassword);
    console.log("Received Data:",req.body);
    
    // every field is required
    if(!name || !email || !password || !confirmPassword){
        return res.status(401).json({
            success:false,
            message:'All fields are required'
        })
    }
    // to validate the email and password fields
    const validEmail = emailValidators.validate(email);
    if(!validEmail){
        return res.status(402).json({
            success:false,
            message:'No account associated with this email'
        })
    }
    try {
// send password not match err if password !== confirmPassword
        if(password !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:'Password is incorrect'
            })
        }

        const userInfo = userModels(req.body);
    // userSchema "pre" middleware functions for "save" will hash the password using bcrypt
    // before saving the data into the database
        const result = await userInfo.save();

        res.status(200).json({
            success:true,
            data:result
        })
    } catch (error) {
        // send the message of the email is not unique.
        if(error.code === 11000){
            return res.status(400).json({
                success:false,
                message:'Account already exists with provided email id'
            });
        }
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
    
}

/******************************************************
 * @LOGIN
 * @route /api/auth/login
 * @method POST
 * @description verify user and send cookie with jwt token
 * @body email , password
 * @returns User Object , cookie
 ******************************************************/
const login = async(req,res,next)=>{
    const {email,password} = req.body;
    // send response with error message if email or password is missing
    if(!email || !password){
        return res.status(404).json({
            success:false,
            message:'All fields are required'
        })
    }

    try {
        // check user exists or not
        const user = await user.userModels
        .findOne({email})
        .select("+password")
        
        // If user is null or the password is incorrect return response with error message
        if(!user || !(await bcrypt.compare(password,user.password))){
             // bcrypt.compare returns boolean value
            return res.status(405).json({
                success:false,
                message:'Invalid credentials'
            })
        }

        // Create jwt token using userSchema method( jwtToken() )
        const token = user.jwtToken()
        user.password = undefined

        const cookieOption = {
            maxAge:24 * 60 * 60 * 1000, //24hr
            httpOnly:true, //not able to modify  the cookie in client side
        }
        res.cookie("token",token,cookieOption)
        res.status(200).json({
            success:true,
            data:user, 
            message:'User login successfully'
        })
    } catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

 /******************************************************
 * @GETUSER
 * @route /api/auth/user
 * @method GET
 * @description retrieve user data from mongoDb if user is valid(jwt auth)
 * @returns User Object
 ******************************************************/
 const getUser = async(req,res,next)=>{
    const userId = req.user.id;

    try {
        const user = await userModels.findById(userId);
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}

module.exports =
{
    register,
    login,
    getUser
} 