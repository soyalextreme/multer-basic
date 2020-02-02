const { Router } = require("express");
const route = Router();
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

// configuracion storage de el middleware multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"),
  filename: (req, file, cb) => {
    cb(
      null,
      uuid() +
        path
          .extname(file.originalname)
          .toLocaleLowerCase() /* Here can goes whatever name for the file */
    );
  }
});

//middleware

const uploadMid = multer({
  storage,
  limits: { fileSize: 10000000 },
  dest: path.join(__dirname, "../public/images"),
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) return cb(null, true);
    cb("Error: archivo no sportado");
  }
}).single("image");

// routes

route.get("/", (req, res) => {
  res.render("index");
});

route.post("/upload", uploadMid, (req, res) => {
  console.log(req.file);
  res.send("uploaded");
});

module.exports = route;
