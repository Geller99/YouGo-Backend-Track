"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startWith == "image")
        cb(null, true);
    cb(new Error("Wrong file type"), false);
};
exports.upload = multer({
    storage: multerStorage,
    filter: multerFilter,
});
