const bcrypt = require('bcrypt');
const User = require('../../db/User');
const jwt = require('jsonwebtoken');
const {validateUserSignUp,validateUserSignIn} = require('../../validation/userValidation')



const AdminSignUpController = async(req,res) =>{
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
        newUser.role = "Admin"
        const addUser = await User.create(newUser);
        res.status(200).json({ msg : 'Admin Added Succesfully '})
        }
     }
     catch(error)
     {
         res.status(500).json({ error : error.message })
     } 
    
}


const AdminSignInController = async(req,res) => {
    try{
        await validateUserSignIn(req.body)
        const user = await UserModel.findByEmailAndPassword(
            req.body
        );
        if(user)
        {
            const token = jwt.sign({ _id : user._id, role : user.role },process.env.SECRET,{ expiresIn : '1h' })
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

const AdminProfile = (req,res) => {
    res.status(200).json({ msg : 'Admin Profile'})
}
















module.exports = {
    AdminSignUpController,
    AdminSignInController,
    AdminProfile,
}