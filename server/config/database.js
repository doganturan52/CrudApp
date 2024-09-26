const mongoose = require('mongoose');

const database = () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log(error);
        })

}

module.exports = database;