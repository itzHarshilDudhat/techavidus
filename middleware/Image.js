import multer, { diskStorage } from "multer";
import { ResponseMsg } from "../utils/ResponseMsg.js";
import dotenv from "dotenv";
dotenv.config();
var storage = diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (request, file, callback) {
    var ext = file.originalname.split(".");
    callback(null, Date.now() + "." + ext[ext.length - 1]);
  },
});
var upload = multer({ storage: storage }).fields([
  {
    name: "picture",
    maxCount: 1,
  },
]);
export default function (req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({
        message: ResponseMsg.SERVER_ERROR,
        data: [],
      });
    } else {
      //   console.log(req.files);
      if (req.files.picture) {
        var Picture = req.files.picture ? req.files.picture[0].filename : "";
        Picture = `${process.env.SERVER_URL}images/${Picture}`;
        req.pictureImgUrl = Picture;
        next();
      } else {
        req.pictureImgUrl = undefined;
        next();
      }
    }
  });
}
