const multer = require("multer");
const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.startWith == "image") cb(null, true);
  cb(new Error("Wrong file type"), false);
};

export const upload = multer({
  storage: multerStorage,
  filter: multerFilter,
});
