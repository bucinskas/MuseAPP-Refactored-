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
    let shot = await Shot.findByIdAndUpdate(req.params.id, req.body.shot);
    res.redirect(`/shots/${shot.id}`);
  },
  async shotDestroy(req, res, next) {
    let shot = await Shot.findByIdAndRemove(req.params.id);
    res.redirect("/shots");
  }

}