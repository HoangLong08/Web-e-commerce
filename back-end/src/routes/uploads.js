const express = require("express");
const router = express.Router();
const multer = require("multer");
const { verify } = require("../../utils/verify");

//admin
let images = [];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const match = ["image/png", "image/jpeg"];
    const nameFile = file.originalname.replace(" ", "_");
    tmpUrl = Date.now() + nameFile;
    const { originalname } = file;
    images.push({
      name: file.originalname,
      url: "http://localhost:" + 5000 + "/images/" + tmpUrl,
    });
    cb(null, tmpUrl);
  },
});

const uploadMultiple = multer({ storage: storage }).array("files", 10);

router.post(
  "/admin/multiple",
  verify,
  uploadMultiple,
  async (req, res, next) => {
    const tmpImages = [...images];

    const resData = res.status(200).json({
      status: "200",
      message: "upload images success",
      data: tmpImages,
    });
    images = [];
    return resData;
  }
);

const uploadSingle = multer({ storage: storage });

router.post(
  "/admin/single",
  verify,
  uploadSingle.single("file"),
  async (req, res, next) => {
    const file = req.file;
    return res.status(200).json({
      status: "200",
      message: "upload image success",
      data: `http://localhost:5000/images/${file.filename}`,
    });
  }
);

module.exports = router;
