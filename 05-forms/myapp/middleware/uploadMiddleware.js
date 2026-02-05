import multer from "multer";
import extension from "../classes/MimeTypes.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, join(__dirname, "../", "public/done"));
  },
  filename(req, file, cb) {
    const ext = new extension();
    cb(
      null,
      file.fieldname + "-" + Date.now() + ext.getExtension(file.mimetype)
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
  dest: join(__dirname, "../", "public"),
});

export default upload;
