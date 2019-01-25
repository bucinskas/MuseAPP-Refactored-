const Shot = require("../models/shot");
const User = require("../models/user");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: 'dnau0mzjg',
  api_key: '591971121348592',
  api_secret: process.env.CLOUDINARY_SECRET
});


module.exports = {
  async getShots(req, res, next) {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    let shots = await Shot.find({$or: [{title: regex}, {category: regex}, {"shot.author": regex}]}).populate("author").exec(); 
    if(shots.length < 1) {
      req.session.error = "Sorry, no shots match your query. Please try again";
      return res.redirect("back");
     }
    res.render("shots/index", { shots });
  } else {
    let shots = await Shot.find({}).
  populate("author").exec(); 
  res.render("shots/index", { shots });
  }
  },
  shotNew(req, res, next) {
      res.render("shots/new");
  },
  async shotCreate(req, res, next) {


    // UPLOADING MULTIPLE IMAGES
    //req.body.shot.images = []; 
    // for(const file of req.files) {
    //   req.body.shot.images.push({
    //     url: image.secure_url,
    //     public_id: image.public_id
    //   });
    // }
    if(!req.file) {
			req.session.error = 'Please upload an image.';
			return res.redirect('shots/new');
		}
    let image = await cloudinary.v2.uploader.upload(req.file.path, {"width":400,"height":400,"crop":"fill", "gravity":"auto"}); 
    req.body.shot.image = image.secure_url; 
    let shot = await Shot.create(req.body.shot);
    shot.author = req.user._id; 
    shot.save();
    //req.session.success = 'Shot created successfully';
    res.redirect(`/shots/${shot.id}`);
    
    
  },
  
  async shotDisplay(req, res, next) {
    let shot = await Shot.findById(req.params.id).populate({
     path: 'comments',
     options: { sort: { "_id": -1 }},
     populate: { 
       path: 'author',
       model: 'User'
      }
    });

    let loveColorClass = "colorGrey";
    if(req.user){
    let isInArray = shot.likes.some(function (user) {
    return user.equals(req.user._id);
    });
    if(isInArray){loveColorClass = "colorRed"}
    }
    
    // display all shots by the user on side div 
    let shots = await Shot.find({}).where('author').equals(shot.author.id).exec();
    res.render("shots/show", { shot, shots, loveColorClass });
  },

  async shotEdit(req, res, next) {
    let shot = await Shot.findById(req.params.id);
    res.render("shots/edit", { shot });  
  },
  async shotUpdate(req, res, next) {
    // find the post by id
    // let shot = await Shot.findById(req.params.id);
    // // check if there is ant images for deletion 
    // if(req.body.deleteImages && req.body.deleteImages.length) {
    //   // assign deleteImages from req.body. to its own variable
    //   let deleteImages = req.body.deleteImages;
    //   // [ 'wqmc8wkqywggvvw3fmnu' ] 
    //   // loop over deleteImages
    //   for(const public_id of deleteImages) {
    //     // delete images from cloudinary 
    //     await cloudinary.v2.uploader.destroy(public_id);
    //     // delete images from shot.image
    //     for(const image of shot.images) {
    //       if(image.public_id === public_id) {
    //         let index = shot.images.indexOf(image);
    //         shot.images.splice(index, 1);
    //       }
    //     }
    //   }
    // }
    // check if there's ant images for upload 
    // if (req.files) {
    //   // upload images  
    //   for(const file of req.files) {
    //     let image = await cloudinary.v2.uploader.upload(file.path);
    //     // add images to shot.images array 
    //       shot.images.push({
    //       url: image.secure_url,
    //       public_id: image.public_id
    //     });
    //   }
    // }
    // update the shot with the new properties 
    // shot.title = req.body.shot.title;
    // shot.body = req.body.shot.body;

    // // save the updated shot into databse 
    // shot.save();
    // // redirect to show page  
    // res.redirect(`/shots/${shot.id}`);
    let shot = await Shot.findById(req.params.id);
    await cloudinary.v2.uploader.destroy(shot.shotId);

    if(req.file) {  
      cloudinary.v2.uploader.upload(req.file.path, {public_id: public_id}, async (result) => { 
        req.body.shot.image = result.secure_url;
        shot.shotId = result.public_id;
        let shot = await Shot.findByIdAndUpdate(req.params.id, req.body.shot);
        req.session.success = 'Your post has been successfully updated';
        res.redirect(`/shots/${shot.id}`);
      });
  } else {
      let shot = await Shot.findByIdAndUpdate(req.params.id, req.body.shot);    
      req.session.success = 'Your post has been successfully updated';
      res.redirect(`/shots/${shot.id}`);
  }
    
  },
  async shotDestroy(req, res, next) {

    let shot = await Shot.findById(req.params.id);
    // for(const image of shot.images) {
    //   await cloudinary.v2.uploader.destroy(image.public_id);
    // }
    await shot.remove();
    res.redirect("/shots");
  }

};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}