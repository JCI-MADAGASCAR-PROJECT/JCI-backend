import multer from "multer";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";
import { fileTypeFromFile } from "file-type";
import fsPromises from "fs/promises";
import prisma from "../DB/db.config.js";


const __dirname = dirname(fileURLToPath(import.meta.url));
const picsDir =  path.join(__dirname, "../uploads")
if (!fs.existsSync(picsDir)) {
  fs.mkdirSync(picsDir, { recursive: true });
}


const avatarDir = path.join(picsDir, "avatar");
const eventsDir = path.join(picsDir, "events");
const itemsDir = path.join(picsDir, "items");
const eventsFileDir = path.join(picsDir, "events/files");

[avatarDir, eventsDir, eventsFileDir, itemsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});


// Fichier accepté uniquement si image
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées"), false);
  }
};
const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers PDF sont autorisés"), false);
  }
};

const makeStorage = (dir) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadAvatar = multer({ storage: makeStorage(avatarDir), fileFilter }).single("picture");
export const uploadEvent = multer({ storage: makeStorage(eventsDir), fileFilter }).single("picture");
export const uploadItem = multer({ storage: makeStorage(itemsDir), fileFilter }).single("picture");
export const uploadEventFile = multer({ storage: makeStorage(eventsFileDir), fileFilter: pdfFileFilter }).single("file");

export const uploadOl = multer({
  storage: makeStorage(avatarDir),
  fileFilter
}).fields([
  { name: "mapImg", maxCount: 1 },
  { name: "logoImg", maxCount: 1 }
]);

export const addImagePathAvatar = (req, res, next) => {
  if (req.file) req.body.imgUrl = `/uploads/avatar/${req.file.filename}`;
  next();
};
export const addImagePathItem = (req, res, next) => {
  if (req.file) req.body.imgUrl = `/uploads/items/${req.file.filename}`;
  next();
};

export const addImagePathEvents = (req, res, next) => {
  
  if (req.file) req.body.imgUrl = `/uploads/events/${req.file.filename}`;
  next();
};
export const addImagePathEventFiles = (req, res, next) => {
  
  if (req.file) req.body.fileUrl = `/uploads/events/files/${req.file.filename}`;
  next();
};
export const addImagePathOlMap = (req, res, next) => {
  if (req.files?.mapImg?.[0]) {
    req.body.mapImgUrl = `/uploads/avatar/${req.files.mapImg[0].filename}`;
  }
  next();
};

export const addImagePathOlLogo = (req, res, next) => {
  if (req.files?.logoImg?.[0]) {
    req.body.logoImgUrl = `/uploads/avatar/${req.files.logoImg[0].filename}`;
  }
  next();
};

export const titleExisting = async (req, res, next) => {
  const { title } = req.body;
  const existingTitle = await prisma.bureauNational.findUnique({
      where: { title }
  });
  if (existingTitle) {
      return res.status(400).json({ message: "Le titre est déjà utilisé" });
  }
  if (!title) {
    return res.status(400).json({ message: "Le titre est obligatoire" });
  }
  next();
};
export const titleExistingUpdate = async (req, res, next) => {
  const { title } = req.body;
  const { id } = req.params;
  const existingTitle = await prisma.bureauNational.findUnique({
      where: { 
        title,
        NOT: {
            id: Number(id),
          },
    },

  });
  if (existingTitle) {
      return res.status(400).json({ message: "Le titre est déjà utilisé" });
  }
  if (!title) {
    return res.status(400).json({ message: "Le titre est obligatoire" });
  }
  next();
};

export const verifyImageFile = async (req, res, next) => {
  if (!req.file) return next();

  const detected = await fileTypeFromFile(req.file.path);
  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (!detected || !allowed.includes(detected.mime)) {
    await fsPromises.unlink(req.file.path);
    return res.status(400).json({ message: "Le contenu du fichier est invalide" });
  }

  next();
};