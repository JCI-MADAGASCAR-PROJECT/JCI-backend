import multer from "multer";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs";
import { fileTypeFromFile } from "file-type";
import { fileTypeFromBuffer } from "file-type";
import fsPromises from "fs/promises";
import prisma from "../DB/db.config.js";
import { uploadToOvh } from "../services/ovhSftp.js";
import sharp from "sharp";


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


const optimizeImage = async (buffer, width = 1920) => {
  return sharp(buffer)
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toBuffer();
};


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

const makeStorage = () => multer.memoryStorage();


const IMG_MAX = 5 * 1024 * 1024;   
const PDF_MAX = 10 * 1024 * 1024;  

export const uploadAvatar = multer({
  storage: makeStorage(),
  fileFilter,
  limits: { fileSize: IMG_MAX }
}).single("picture");

export const uploadEvent = multer({
  storage: makeStorage(),
  fileFilter,
  limits: { fileSize: IMG_MAX }
}).single("picture");

export const uploadItem = multer({
  storage: makeStorage(),
  fileFilter,
  limits: { fileSize: IMG_MAX }
}).single("picture");

export const uploadEventFile = multer({
  storage: makeStorage(),
  fileFilter: pdfFileFilter,
  limits: { fileSize: PDF_MAX }
}).single("file");

export const uploadOl = multer({
  storage: makeStorage(),
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

  const detected = await fileTypeFromBuffer(req.file.buffer);
  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (!detected || !allowed.includes(detected.mime)) {
    await fsPromises.unlink(req.file.path);
    return res.status(400).json({ message: "Le contenu du fichier est invalide" });
  }

  next();
};

export const verifyImageFileOl = async (req, res, next) => {
  const files = Object.values(req.files || {}).flat();

  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  try {
    for (const file of files) {
      const detected = await fileTypeFromBuffer(file.buffer);

      if (!detected || !allowed.includes(detected.mime)) {
        return res.status(400).json({
          message: "Le contenu du fichier est invalide"
        });
      }
    }

    next();
  } catch (error) {
    console.error("[verifyImageFileOl]", error);

    return res.status(500).json({
      message: "Erreur lors de la vérification du fichier"
    });
  }
};

export const verifyPdfFile = async (req, res, next) => {
  if (!req.file) return next();

  const detected = await fileTypeFromBuffer(req.file.buffer);

  if (!detected || detected.mime !== "application/pdf") {
    return res.status(400).json({
      message: "Le fichier n'est pas un PDF valide"
    });
  }

  next();
};

export const uploadAvatarToOvh = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const filename = `${uniqueSuffix}.webp`;

    const optimizedBuffer = await optimizeImage(req.file.buffer, 200);

    await uploadToOvh(
      optimizedBuffer,
      filename,
      "avatar"
    );

    req.file.filename = filename;

    next();
  } catch (error) {
    console.error("Erreur upload OVH :", error);

    return res.status(500).json({
      message: "Erreur lors de l'upload de l'image"
    });
  }
};

export const uploadEventToOvh = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const filename = `${uniqueSuffix}.webp`;

    const optimizedBuffer = await optimizeImage(req.file.buffer, 1600);

    await uploadToOvh(
      optimizedBuffer,
      filename,
      "events"
    );

    req.file.filename = filename;

    next();
  } catch (error) {
    console.error("Erreur upload OVH :", error);

    return res.status(500).json({
      message: "Erreur lors de l'upload de l'image"
    });
  }
};

export const uploadItemToOvh = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const filename = `${uniqueSuffix}.webp`;

      const optimizedBuffer = await optimizeImage(req.file.buffer, 1200);

      await uploadToOvh(
        optimizedBuffer,
        filename,
        "items"
      );

    req.file.filename = filename;

    next();
  } catch (error) {
    console.error("Erreur upload OVH :", error);

    return res.status(500).json({
      message: "Erreur lors de l'upload de l'image"
    });
  }
};

export const uploadEventFileToOvh = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const filename =
      uniqueSuffix + path.extname(req.file.originalname);

    await uploadToOvh(
      req.file.buffer,
      filename,
      "events/files"
    );

    req.file.filename = filename;

    next();
  } catch (error) {
    console.error("Erreur upload OVH :", error);

    return res.status(500).json({
      message: "Erreur lors de l'upload du fichier"
    });
  }
};

export const uploadOlToOvh = async (req, res, next) => {
  if (!req.files) return next();

  try {
    const files = Object.values(req.files).flat();

    for (const file of files) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);

      const width = file.fieldname === "logoImg" ? 800 : 1200;

      const filename = `${uniqueSuffix}.webp`;

      const optimizedBuffer = await optimizeImage(
        file.buffer,
        width
      );

      await uploadToOvh(
        optimizedBuffer,
        filename,
        "avatar"
      );

      file.filename = filename;
    }

    next();
  } catch (error) {
    console.error("Erreur upload OVH :", error);

    return res.status(500).json({
      message: "Erreur lors de l'upload des fichiers"
    });
  }
};