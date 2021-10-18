const bcrypt = require('bcrypt');
const User = require('../../db/User');
const Token = require('../../db/Token')
const jwt = require('jsonwebtoken');
const {validateUserSignUp,validateUserSignIn,validateForgetPassword} = require('../../validation/userValidation')




const UserSignUpController = async(req,res) =>{
    try{
        await validateUserSignUp(req.body.newUser)
    
        const {newUser} = req.body;
    
        const checkEmail = await User.findOne({ email : newUser.email })
    
        const checkUsername = await User.findOne({ userName : newUser.userName })
    
    
        if(checkEmail || checkUsername){
            res.status(400).json({ msg : 'User Already Exist'})
        }
        else
        {
        newUser.role = "User"
        console.log(newUser);
        const addUser = await User.create(newUser);
        res.status(200).json({ msg : 'User Added Succesfully '})
        }
     }
     catch(error)
     {
         res.status(500).json({ error : error.message })
     } 
    
}


const UserSignInController = async(req,res) => {
    try{
        await validateUserSignIn(req.body)
        const user = await UserModel.findByEmailAndPassword(
            req.body
        );
        if(user)
        {
            const token = jwt.sign({ _id : user._id },process.env.SECRET,{ expiresIn : '1h' })
            const {fullname,email,userName,role} = user
            res.status(200).json({
                msg : 'Login Successfull',
                token,
                user : {fullname,email,userName,role}
            })
        }
       }
       catch(error)
       {
           res.status(500).json({ error : error.message })
       }
    
}

const UserProfile = (req,res) => {
    res.status(200).json({ msg : 'User Profile'})
}

const UserForgetPassword = async(req,res) => {
    try{

    await validateForgetPassword(req.body);
    
    const {email} = req.body;

    const user = await User.findOne({ email })

    if(!user)
    {
        res.status(400).json({ error : "User Doesn't Exist "});
    }
    else
    {
        const expiry = '15m'
        const resetToken = jwt.sign({ _id : user._id, email: user.email}, process.env.secret, { expiresIn : expiry})
        const resetURL = `http://localhost:${process.env.PORT}/api/user/resetPassword/${user._id}/${resetToken}`;
        console.log('Reset Token', resetToken);
        const resetTokenSave = await Token.create({
        userId : user._id,
        resetToken
        })
        console.log(resetTokenSave)
  
        res.status(200).json({
            msg : 'Reset Password Link Generated',
            link : resetURL,
            expiresIn : `${expiry}`
        })
    }
    }catch(error)
    {
        res.status(500).json({ error : error.message});
    }
}

const UserResetPassword = async(req,res) => {

    try{
        const {_id,token} = req.params

        const newToken = Token.findOne({ userId : _id })

        if(newToken)
        {
            const verifyToken = jwt.verify(token, process.env.SECRET);
            if(verifyToken)
            {
                res.status(200).json({ msg : 'Validated' })
            }
            else
            {
                res.status(400).json({ error : 'Reset Token Malfunctioned' })
            }
        }
        else
        {
            res.status(400).json({ error : 'Something Went Wrong '});
        }   
    }catch(error)
    {
        res.status(500).json({ error : error.message })
    }
        
}

module.exports = {
    UserSignUpController,
    UserSignInController,
    UserProfile,
    UserForgetPassword,
    UserResetPassword
}