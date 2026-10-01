import prisma from "../DB/db.config.js";
import { deleteFromOvh } from "../services/ovhSftp.js";

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

export const update = async (name, firstName, title, imgUrl, id) => {
    const memberId = validateId(id);

    let validatedData = z.object({
            name: nameSchema,
            firstName: firstNameSchema,
            title: titleSchema,
        }).safeParse({
            name,
            firstName,
            title,
        });

    if (!validatedData.success) {
        const error = new Error("Données invalides");
        error.details = validatedData.error.flatten().fieldErrors;
        throw error;
    }
    
    validatedData = validatedData.data;

    const member = await prisma.bureauNational.findUnique({
        where: { id: memberId },
    });

    if (!member) {
        throw new Error("Membre non trouvé");
    }

    const existingTitle = await prisma.bureauNational.findFirst({
        where: {
            title: validatedData.title,
            NOT: { id: memberId },
        },
    });

    if (existingTitle) {
        throw new Error("Le titre est déjà utilisé");
    }

    // On ne touche à l'image que si une nouvelle est fournie
    if (imgUrl) {
        validatedData = validateMemberData(
            name,
            firstName,
            title,
            imgUrl
        );
        if (member.imgUrl && member.imgUrl !== imgUrl) {
            await deleteFromOvh(member.imgUrl);
        }
        
    }

    return await prisma.bureauNational.update({
        where: { id: memberId },
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
        await deleteFromOvh(member.imgUrl);
    }

    return await prisma.bureauNational.delete({
        where: {
            id: memberId,
        },
    });
};