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

const contentSchema = z
    .string()
    .trim()
    .min(1, "Le contenu ne peut pas être vide")
    .max(1000, "Le contenu ne doit pas dépasser 1000 caractères");

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

const validateEventData = (title, type, imgUrl, content, date, organisationLocalId) => {
    const result = z
        .object({
            title: nameSchema,
            type: nameSchema,
            imgUrl: imgUrlSchema,
            content: contentSchema,
            date: z
                .string()
                .refine((val) => !isNaN(Date.parse(val)), "Date invalide")
                .transform((val) => new Date(val)),
            organisationLocalId: z.coerce.number().int().positive().optional(),
        })
        .safeParse({
            title,
            type,
            imgUrl,
            content,
            date,
            organisationLocalId,
        });

    if (!result.success) {
        const error = new Error("Données invalides");
        error.details = result.error.flatten().fieldErrors;
        throw error;
    }

    return result.data;
};

export const fetchAllEventsPaginated = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const [events, total] = await Promise.all([
        prisma.event.findMany({
            orderBy: { date: "desc" },
            take: limit,
            skip,
        }),
        prisma.event.count(),
    ]);
    return { events, total, page, totalPages: Math.ceil(total / limit) };
};
export const fetchAllActuEvents = async () => {
    return await prisma.event.findMany({
        orderBy: {
            date: 'desc'
        },
        take: 4,
    });
};

export const fetchEventById = async (eventId) => {
    return await prisma.event.findUnique({
        where: { id: Number(eventId) }
    });
};

export const fetchAllEventsByOrganisationLocal = async (organisationLocalId) => {
    return await prisma.event.findMany({
        orderBy: {
            date: 'desc'
        },
        where: {
            organisationLocalId: Number(organisationLocalId)
        }
    });
};

export const fetchAllEventsByNational = async () => {
    return await prisma.event.findMany({
        orderBy: {
            date: 'desc'
        },
        where: {
            organisationLocalId: null,
        }
    });
};

export const create = async (title, type, imgUrl, content, date, organisationLocalId) => {
    const validatedData = validateEventData(title, type, imgUrl, content, date, organisationLocalId);
    return await prisma.event.create({
        data: {
            title: validatedData.title,
            type: validatedData.type,
            imgUrl: validatedData.imgUrl,
            content: validatedData.content,
            date: validatedData.date,
            organisationLocalId: validatedData.organisationLocalId,
        }
    })
}

export const createNational = async (title, type, imgUrl, content, date) =>{
    const validatedData = z.object({
        title: z.string().min(1),
        type: z.string().min(1),
        imgUrl: z.string().min(1),
        content: z.string().min(1),
        date: z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), "Date invalide")
            .transform((val) => new Date(val)),
    }).safeParse({ title, type, imgUrl, content, date });

    if (!validatedData.success) {
        const error = new Error("Données invalides");
        error.details = validatedData.error.flatten().fieldErrors;
        throw error;
    }

    const data = validatedData.data;
    return await prisma.event.create({
        data: {
            title: data.title,
            type: data.type,
            imgUrl: data.imgUrl,
            content: data.content,
            date: data.date,
        }
    })
}

export const update = async (title, type, imgUrl, content, date, id) => {
    const eventId = validateId(id);
    let validateData = z.object({
        title: z.string().min(1),
        type: z.string().min(1),
        content: z.string().min(1),
        date: z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), "Date invalide")
            .transform((val) => new Date(val)),
            });
    validateData = validateData.parse({ title, type, imgUrl, content, date });
    if(imgUrl) {
        validateData = validateEventData(title, type, imgUrl, content, date);
        const event = await prisma.event.findUnique({
            where: { id: eventId }
        });
         if (event && event.imgUrl && event.imgUrl !== imgUrl) {
            await deleteFromOvh(event.imgUrl);
        }
    }
    return await prisma.event.update({
        where: { id:eventId },
        data: validateData
    })
}

export const deleteEvent = async (id) => {
    const eventId = validateId(id);
    const event = await prisma.event.findUnique({
        where: { id: eventId }
    });

    if (!event) {
        throw new Error("Event not found");
        }
    await deleteFromOvh(event.imgUrl);
    return await prisma.event.delete({
        where: {id:eventId }
    })
}