const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true}, //required: true},
  email: String, //required: true},
  avatar: { type: String, default: "https://res.cloudinary.com/dnau0mzjg/image/upload/v1542579459/user.png" },
  firstName: String,
  lastName: String, 
  bio: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
  //bio: String, 
  //location: String, 
    //unique: true, 
    //required: true,
    //lowercase: true,
    //match: /^\S+@\S+\.\S+$/
  //}
  //shots: [
    //{
      //type: mongoose.Schema.Types.ObjectId,
      //ref: "Shot"
    //}
  //]
  //password: { 
    //type: String,
    //required: true,
    //minlength: 6,
    //maxlength: 128
  //}
});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);