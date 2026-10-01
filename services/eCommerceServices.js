import prisma from "../DB/db.config.js"
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

const validateItemData = (name, description, price, imgUrl) => {
    const result = z
        .object({
            name: nameSchema,
            description: nameSchema,
            price: z.number().positive("Le prix doit être positif"),
            imgUrl: imgUrlSchema,
        })
        .safeParse({
            name,
            description,
            price,
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
    return await prisma.item.findMany({
        orderBy: {
            name: "asc"
        }
    });
};

export const create = async (name, description, price, imgUrl) =>{
    const validatedData = validateItemData(name, description, price, imgUrl);
    return await prisma.item.create({
        data:{
            name: validatedData.name,
            description: validatedData.description,
            price: validatedData.price,
            imgUrl: validatedData.imgUrl
        }
    })
}

export const update = async (name, description, price, imgUrl, id) =>{
    const itemId = validateId(id);
    let validatedData = z.object({
            name: nameSchema,
            description: nameSchema,
            price: z.number().positive("Le prix doit être positif"),
        })
        .safeParse({
            name,
            description,
            price,
        });

    if (!validatedData.success) {
        const error = new Error("Données invalides");
        error.details = validatedData.error.flatten().fieldErrors;
        throw error;
    }

    validatedData = validatedData.data;
    
    const existingItem = await prisma.item.findUnique({
        where:{id:itemId}
    });
    if(!existingItem) {
        throw new Error("Item not found");
    }
    if(imgUrl) {
        validatedData = validateItemData(name, description, price, imgUrl);
        if (existingItem && existingItem.imgUrl && existingItem.imgUrl !== imgUrl) {
            await deleteFromOvh(existingItem.imgUrl);
        }
    }

    return await prisma.item.update({
        where:{id:itemId},
        data: validatedData
    })
}

export const deleteItem = async (id) =>{
    const itemId = validateId(id);
    const item = await prisma.item.findUnique({
        where:{id:itemId}
    });

    if (item && item.imgUrl) {
        await deleteFromOvh(item.imgUrl);
    }

    return await prisma.item.delete({
        where:{id:itemId}
    })
}