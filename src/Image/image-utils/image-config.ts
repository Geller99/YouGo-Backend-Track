const multer = require("multer");
const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: any, cb: any) => {
   if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

export const upload = multer({
  storage: multerStorage,
  filter: multerFilter,
});
