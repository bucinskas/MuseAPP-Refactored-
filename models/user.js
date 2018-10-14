const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  avatar: {
    type: tring, 
    default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAAPFBMVEWxsbH////Q0NC3t7f8/PzU1NTCwsLf39/Nzc26urr09PT5+fnY2Ni/v7+4uLjv7+/l5eXc3NzGxsbr6+s/AWgAAAADS0lEQVR4nO3c69aqIBAG4PCApwwP93+vX9aqXYkMIDPW2u/zn+QwDJrg6QQAAAAAAAAAAAAAAAAAAAAA/4VLnY3VmNVN7A/orKyqMptSVspbfjbqwZwj2jAN3aN8N9TpK+iWnwv1qqjysB/Q5q28amWbMHXqUxFSg3xYlVfzha26K+f15a8q7/KNsZVve8Yqv6ms9Vdq8Czfr8fvPohCs9ne/4vRq3yzUf9rC0TGYNqsv1KZzw9Y4+euDUwFMfLN/lu60GMiZo7yAfMo2nYA+VXA2QFKsQdRXjivX5ArmrsDvBNBtNJ9fXoet+7yBfcscMzAm5Yo3xPlFXMqzanrU0FMRBB7DGmyAcQdxUyVp4Zwp5pswNn9A8QUuOJtADWHyUTqTmIL3llMhjDVALK8in488rJ7BNzLGP8I8M+BgrX+v5+FiDsJRYbw0esA2YNUB5JDyP1sTE0CYgocfy9E3A3Td6NEHuN/IHBXwOP6ziGgO2A/VwU6jwBwBqHfU/U+2pGIvO6FHXnAcFf+ZvuhlpzBN/nmGHYCAbTYyuW+E7DZaEEn9s9WbY2i0rt8bo0iI9T/C73uwy7oWXBc138Q+E/oxfl9PSjGwMv3H4NgxF8S5PXz//1iqCN6r//3gqEddfoK+tBTVma1jh77RmfXH9CCsQ8AAAAAAAAAAAAAAPB76owd73YVy8mL1Hg3DNF75nbzf90cg9w5vB/z63p64+pOzHvmbK/Y0+LecENvW9yJ/ZU3cwxxRxB7HuLNQYsLbwMEjvOxrmXsR2hOzEuByJ4tcvtzvFmi/s6jfDsJ7XpiGwKZAWBczMT2bTElIokUdNfQR3kiSOybfmBZjvkX4RfUicQIMvumHxhWM7F9x3fJg0g0gBaJM5FcBnrY3kQfQ+Iw/ac+YS6V+ZzBpylZC6Q+KMHVgqPq73Oy0ov4p21eWpBgDIK+KpOc5TM3gcJOfqS3daDHV3v44QH7gR5f8wH5f6WMngiF+P2DXR95b2oOWb6sYgbhW7r/Lq8CmxD8VTF2TUgTiurw5GORl54ptS2/rfef9Ei24bBDb776cthMSmYovyfxOOmsmo15jkZrzFxlX97zG7Tg9/sAAAAAAAAAAAAAAAAA4Bf8AR/dIKu1pTgHAAAAAElFTkSuQmCC" },
  firstName: String,
  lastName: String, 
  bio: String, 
  location: String, 
  email: {
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: { 
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  }
});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);