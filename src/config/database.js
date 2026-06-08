
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sakshisingh7384_db_user:sakshi2212084@namastenode.k8zdzzx.mongodb.net/devTinder?appName=NamasteNode"

    );
};

module.exports =connectDB;

  