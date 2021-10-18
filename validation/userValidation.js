const joi = require('joi');

module.exports.validateUserSignUp = (User) => {
    const Schema = joi.object({
        firstName : joi.string().required().trim().min(5).max(30),
        lastName : joi.string().required().trim().min(3).max(30),
        userName : joi.string().required().trim().lowercase(),
        email : joi.string().required().trim().lowercase(),
        password : joi.string().required(),
        contactNumber : joi.string(),
        profilePicture : joi.string()
    })

    return Schema.validateAsync(User);
}


module.exports.validateUserSignIn = (User) => {
    const Schema = joi.object({
        email : joi.string().required().trim().lowercase(),
        password : joi.string().required(),
    })

    return Schema.validateAsync(User);
}


module.exports.validateForgetPassword = (User) => {
    const Schema = joi.object({
        email : joi.string().required()
    })

    return Schema.validateAsync(User)
}

module.exports.validateResetPassword = (User) => {
    const Schema = joi.object({
        _id : joi.string().required(),
        token : joi.string().required()
    })

    return Schema.validateAsync(User)
}
