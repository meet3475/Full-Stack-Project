const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://meetdobariya480:meet3475@cluster0.fnwp3cw.mongodb.net/demo1")
                                                                                                   //ecommarce
            .then(() => console.log("mongoDB is Sucessfully Conencted"))
            .catch((error) => console.log("mongoDB is data based not Conencted" + error))

    } catch (error) {
        console.log("mongoDB is data based not Conencted" + error)
    }

}

module.exports = connectDB



