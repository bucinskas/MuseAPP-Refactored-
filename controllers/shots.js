const Shot = require("../models/shot");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: 'dnau0mzjg',
  api_key: '591971121348592',
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
  async getShots(req, res, next) {
      let shots = await Shot.find({}); 
      res.render("shots/index", { shots });
  },
  shotNew(req, res, next) {
      res.render("shots/new");
  },
  async shotCreate(req, res, next) {
    req.body.shot.images = []; 
    for(const file of req.files) {
      let image = await cloudinary.v2.uploader.upload(file.path);
      req.body.shot.images.push({
        url: image.secure_url,
        public_id: image.public_id
      });
    }
    let shot = await Shot.create(req.body.shot);
    res.redirect(`/shots/${shot.id}`);
  },
  async shotDisplay(req, res, next) {
    let shot = await Shot.findById(req.params.id);
    res.render("shots/show", { shot });
  },
  async shotEdit(req, res, next) {
    let shot = await Shot.findById(req.params.id);
    res.render("shots/edit", { shot });  
  },
  async shotUpdate(req, res, next) {
    // find the post by id
    let shot = await Shot.findById(req.params.id);
    // check if there is ant images for deletion 
    if(req.body.deleteImages && req.body.deleteImages.length) {
      // assign deleteImages from req.body. to its own variable
      let deleteImages = req.body.deleteImages;
      // [ 'wqmc8wkqywggvvw3fmnu' ] 
      // loop over deleteImages
      for(const public_id of deleteImages) {
        // delete images from cloudinary 
        await cloudinary.v2.uploader.destroy(public_id);
        // delete images from shot.image
        for(const image of shot.images) {
          if(image.public_id === public_id) {
            let index = shot.images.indexOf(image);
            shot.images.splice(index, 1);
          }
        }
      }
    }
    // check if there's ant images for upload 
    if (req.files) {
      // upload images  
      for(const file of req.files) {
        let image = await cloudinary.v2.uploader.upload(file.path);
        // add images to shot.images array 
          shot.images.push({
          url: image.secure_url,
          public_id: image.public_id
        });
      }
    }
    // update the shot with the new properties 
    shot.title = req.body.shot.title;
    shot.body = req.body.shot.body;

    // save the updated shot into databse 
    shot.save();
    // redirect to show page  
    res.redirect(`/shots/${shot.id}`);
  },
  async shotDestroy(req, res, next) {

    let shot = await Shot.findById(req.params.id);
    for(const image of shot.images) {
      await cloudinary.v2.uploader.destroy(image.public_id);
    }
    await shot.remove();
    res.redirect("/shots");
  }

}