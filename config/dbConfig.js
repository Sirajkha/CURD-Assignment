const mongoose  = require('mongoose');

const MONGODB_URL=process.env.MONGODB_URL ||"mongodb://localhost:27017/sigamone";

// database connection
const connectDb = async()=>{
   await mongoose
    .connect(MONGODB_URL)
    .then((conn) => console.log(`connecting to DB:${conn.connection.host}`))
    .catch((err) => console.error(err.message));
}

module.exports = connectDb;