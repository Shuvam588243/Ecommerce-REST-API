const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        min : 3,
        max : 30
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        min : 3,
        max : 30
    },
    userName : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        index : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['User','Admin'],
        default : 'user'
    },
    contactNumber : {
        type : String
    },
    profilePicture : {
        type : String
    }
},{
    timestamps : true
});

userSchema.pre("save", function (next) {
    const user = this;

    //password is modified
    if (!user.isModified("password")) return next();

    //password bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        //hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            //assigning hashed password.0
            user.password = hash;
            return next();
        });
    });
});

userSchema.statics.findByEmailAndPassword = async ({password, email}) => {
    // check whether email exists
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does not exist!!!");

    // Compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) throw new Error("Invalid Password!!!");

    return user;
};

userSchema.virtual('fullname')
.get(function(){
    return `${this.firstName} ${this.lastName}`
})

UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel