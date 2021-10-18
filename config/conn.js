const mongoose = require('mongoose');

const DB = async () => {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASSWORD}@ecommerceapi.bjicj.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    );
}

module.exports = DB