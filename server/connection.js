
const mongoose = require("mongoose");
MONGO_URI = "mongodb+srv://rk3312464:x6lC6JNjk9Mks3TU@new-blog-app.dst3rqc.mongodb.net/blogs?retryWrites=true&w=majority";
const connectDb = async () =>{

    const connection = await mongoose.connect(MONGO_URI);
    if(connection) console.log("Database Connected");
    else console.log("Database Connection failed");
};

module.exports = {connectDb};

//x6lC6JNjk9Mks3TU