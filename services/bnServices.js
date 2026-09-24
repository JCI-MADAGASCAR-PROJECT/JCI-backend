import prisma from "../DB/db.config.js";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

/* =========================
   VALIDATION
========================= */

const nameSchema = z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères");

const firstNameSchema = z
    .string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères");

const titleSchema = z
    .string()
    .trim()
    .min(2, "Le titre doit contenir au moins 2 caractères")
    .max(100, "Le titre ne doit pas dépasser 100 caractères");

const imgUrlSchema = z
    .string()
    .trim()
    .min(1, "Le chemin de l'image est invalide")
    .max(500, "Le chemin de l'image est trop long");

const idSchema = z.coerce
    .number()
    .int("L'ID doit être un entier")
    .positive("L'ID doit être positif");

/* =========================
   HELPERS
========================= */

const validateId = (id) => {
    const result = idSchema.safeParse(id);

    if (!result.success) {
        throw new Error("ID invalide");
    }

    return result.data;
};

const validateMemberData = (name, firstName, title, imgUrl) => {
    const result = z
        .object({
            name: nameSchema,
            firstName: firstNameSchema,
            title: titleSchema,
            imgUrl: imgUrlSchema,
        })
        .safeParse({
            name,
            firstName,
            title,
            imgUrl,
        });

    if (!result.success) {
        const error = new Error("Données invalides");
        error.details = result.error.flatten().fieldErrors;
        throw error;
    }

    return result.data;
};

/*
 * Vérifie que le fichier à supprimer se trouve
 * bien dans le dossier uploads.
 */
const getSafeImagePath = (imgUrl) => {
    if (!imgUrl || typeof imgUrl !== "string") {
        throw new Error("Chemin de fichier invalide");
    }

    const cleanPath = imgUrl
        .replace(/^[/\\]+/, "")
        .replace(/\.\.(?=[/\\])/g, "");

    const uploadsPath = path.resolve(process.cwd(), "uploads");
    const filePath = path.resolve(process.cwd(), cleanPath);

    if (
        filePath !== uploadsPath &&
        !filePath.startsWith(`${uploadsPath}${path.sep}`)
    ) {
        throw new Error("Chemin de fichier non autorisé");
    }

    return filePath;
};

/* =========================
   FETCH ALL
========================= */

export const fetchAll = async () => {
    return await prisma.bureauNational.findMany({
        orderBy: {
            id: "asc",
        },
    });
};

/* =========================
   CREATE
========================= */

export const create = async (name, firstName, title, imgUrl) => {
    const validatedData = validateMemberData(
        name,
        firstName,
        title,
        imgUrl
    );

    const existingTitle = await prisma.bureauNational.findUnique({
        where: {
            title: validatedData.title,
        },
    });

    if (existingTitle) {
        throw new Error("Le titre est déjà utilisé");
    }

    return await prisma.bureauNational.create({
        data: validatedData,
    });
};

/* =========================
   UPDATE
========================= */

export const update = async (
    name,
    firstName,
    title,
    imgUrl,
    id
) => {
    const memberId = validateId(id);

    const validatedData = validateMemberData(
        name,
        firstName,
        title,
        imgUrl
    );

    const member = await prisma.bureauNational.findUnique({
        where: {
            id: memberId,
        },
    });

    if (!member) {
        throw new Error("Membre non trouvé");
    }

    const existingTitle = await prisma.bureauNational.findFirst({
        where: {
            title: validatedData.title,
            NOT: {
                id: memberId,
            },
        },
    });

    if (existingTitle) {
        throw new Error("Le titre est déjà utilisé");
    }

    /*
     * On supprime l'ancienne image uniquement
     * lorsqu'une nouvelle image est fournie.
     */
    if (imgUrl && member.imgUrl && member.imgUrl !== imgUrl) {
        const filePath = getSafeImagePath(member.imgUrl);

        try {
            await fs.unlink(filePath);
        } catch (error) {
            /*
             * Si le fichier n'existe déjà plus,
             * on continue quand même.
             */
            if (error.code !== "ENOENT") {
                throw error;
            }
        }
    }

    return await prisma.bureauNational.update({
        where: {
            id: memberId,
        },
        data: validatedData,
    });
};

/* =========================
   DELETE
========================= */

export const deleteBNMember = async (id) => {
    const memberId = validateId(id);

    const member = await prisma.bureauNational.findUnique({
        where: {
            id: memberId,
        },
    });

    if (!member) {
        throw new Error("Membre non trouvé");
    }

    /*
     * Supprimer le fichier uniquement s'il existe.
     */
    if (member.imgUrl) {
        const filePath = getSafeImagePath(member.imgUrl);

        try {
            await fs.unlink(filePath);
        } catch (error) {
            /*
             * Le fichier peut avoir déjà été supprimé
             * manuellement ou lors d'une opération précédente.
             */
            if (error.code !== "ENOENT") {
                throw error;
            }
        }
    }

    return await prisma.bureauNational.delete({
        where: {
            id: memberId,
        },
    });
};