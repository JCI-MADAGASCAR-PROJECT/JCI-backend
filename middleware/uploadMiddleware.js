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


const IMG_MAX = 5 * 1024 * 1024;   
const PDF_MAX = 10 * 1024 * 1024;  

export const uploadAvatar    = multer({ storage: makeStorage(avatarDir),     fileFilter,               limits: { fileSize: IMG_MAX } }).single("picture");
export const uploadEvent     = multer({ storage: makeStorage(eventsDir),     fileFilter,               limits: { fileSize: IMG_MAX } }).single("picture");
export const uploadItem      = multer({ storage: makeStorage(itemsDir),      fileFilter,               limits: { fileSize: IMG_MAX } }).single("picture");
export const uploadEventFile = multer({ storage: makeStorage(eventsFileDir), fileFilter: pdfFileFilter, limits: { fileSize: PDF_MAX } }).single("file");

export const uploadOl = multer({
  storage: makeStorage(avatarDir),
  fileFilter,
  limits: { fileSize: IMG_MAX }
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

export const verifyImageFileOl = async (req, res, next) => {
  const files = Object.values(req.files || {}).flat()

  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ]

  try {
    for (const file of files) {
      const detected = await fileTypeFromFile(file.path)

      if (!detected || !allowed.includes(detected.mime)) {
        await fsPromises.unlink(file.path)

        return res.status(400).json({
          message: "Le contenu du fichier est invalide"
        })
      }
    }

    next()
  } catch (error) {
    console.error("[verifyImageFile]", error)

    // Nettoyage des fichiers déjà uploadés
    await Promise.all(
      files.map(async (file) => {
        try {
          await fsPromises.unlink(file.path)
        } catch {}
      })
    )

    return res.status(500).json({
      message: "Erreur lors de la vérification du fichier"
    })
  }
}

export const verifyPdfFile = async (req, res, next) => {
  if (!req.file) return next();

  const detected = await fileTypeFromFile(req.file.path);
  // application/pdf = signature magique %PDF en début de fichier
  if (!detected || detected.mime !== "application/pdf") {
    await fsPromises.unlink(req.file.path);
    return res.status(400).json({ message: "Le fichier n'est pas un PDF valide" });
  }

  next();
};