const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
  //username: {type: String, unique: true, required: true},
  avatar: { type: String, default: "https://thumbnailer.mixcloud.com/unsafe/160x160/tmp/d/e/4/e/ed3c-999c-49ef-9136-f7d9e0139394" },
  //lastName: String, 
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