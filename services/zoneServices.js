import prisma from "../DB/db.config.js"
import { z } from "zod";
import { deleteFromOvh } from "../services/ovhSftp.js";

/* =========================
   VALIDATION
========================= */

const nameSchema = z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères");


const imgUrlSchema = z
    .string()
    .trim()
    .min(1, "Le chemin de l'image est invalide")
    .max(500, "Le chemin de l'image est trop long");

const idSchema = z.coerce
    .number()
    .int("L'ID doit être un entier")
    .positive("L'ID doit être positif");



const validateId = (id) => {
    const result = idSchema.safeParse(id);

    if (!result.success) {
        throw new Error("ID invalide");
    }

    return result.data;
};

const validateZoneData = (name, imgUrl) => {
    const result = z
        .object({
            name: nameSchema,
            imgUrl: imgUrlSchema,
        })
        .safeParse({
            name,
            imgUrl,
        });

    if (!result.success) {
        const error = new Error("Données invalides");
        error.details = result.error.flatten().fieldErrors;
        throw error;
    }

    return result.data;
};

export const fetchAll = async () => {
    return await prisma.zone.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const fetchByZoneName = async (zoneName) => {
    return await prisma.zone.findUnique({
        where: { name: zoneName }
    });
};

export const create = async (name, imgUrl) =>{
    const validatedData = validateZoneData(name, imgUrl);

    const existingZone = await fetchByZoneName(validatedData.name);
    if (existingZone) {
        throw new Error("Le nom de la zone existe déjà");
    }
    return await prisma.zone.create({
        data: validatedData
    })
}

export const update = async (name, imgUrl, id) =>{
    const zoneId = validateId(id);

    let validatedData = z.object({
            name: nameSchema,
        }).safeParse({
            name,
        });

    if (!validatedData.success) {
        const error = new Error("Données invalides");
        error.details = validatedData.error.flatten().fieldErrors;
        throw error;
    }
    validatedData = validatedData.data;

    const existingZone = await fetchByZoneName(validatedData.name);

    if (existingZone && existingZone.id !== zoneId) {
        throw new Error("Une zone avec ce nom existe déjà");
    }

    if(imgUrl) {
        validatedData = validateZoneData(name, imgUrl);
        const zone = await prisma.zone.findUnique({
            where: { id: zoneId }
        });
        
        if (zone && zone.imgUrl !== imgUrl) {
            await deleteFromOvh(zone.imgUrl);
        }
    }
    return await prisma.zone.update({
        where:{id:zoneId},
        data: validatedData
    })
}

export const deleteZone = async (id) =>{
    const zoneId = validateId(id);
    const zone = await prisma.zone.findUnique({
        where: { id: zoneId }
    });

    if (!zone) {
    throw new Error("Zone introuvable");
    }
    if (zone && zone.imgUrl) {
        await deleteFromOvh(zone.imgUrl);
    }
    return await prisma.zone.delete({
        where:{id:zoneId}
    })
}