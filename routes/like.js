const Shot = require("../models/shot");

var shotLike = async function(req, res){
    await Shot.findById(req.params.shotId, async function(err, foundShot){
        if(err || !foundShot){
            return; //need to add useful error message here
        } else {
            //check to see if user ID is already in array
            var isInArray = foundShot.likes.some(function (user) {
                return user.equals(req.params.id);
            });
            
            if(isInArray){
                //remove user id from love array
                foundShot.likes.splice(foundShot.likes.indexOf(req.params.id), 1);
                foundShot.save();
                return res.send(false);
                
            } else {
                //add user id to love array
                foundShot.likes.push(req.params.id);
                foundShot.save();
                
                return res.send(true);
            }
        }
    });
};


module.exports = shotLike;


// async shotLove(req, res, next) {  
//     let foundShot = await Shot.findById(req.params.id); 
//     if (err || !foundShot) {
//       return;
//     } else { 
//       let isInArray = foundShot.likes.some(function(user){
//         return user.equals(req.params.id);
//       });
//       debugger
//       if(isInArray){
//         //remove user id from love array
//         foundShot.likes.splice(foundShot.likes.indexOf(req.params.id), 1);
//         foundShot.save();
//         return res.send(false);
//       } else {
//         //add user id to love array
//         foundShot.likes.push(req.params.id);
//         foundShot.save();
//         return res.send(true);
        
//       }
//     }
//   },