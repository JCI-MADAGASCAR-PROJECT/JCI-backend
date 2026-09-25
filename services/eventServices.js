import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";


// ✅ Répertoire de base des uploads — utilisé pour valider les chemins avant fs.unlink
const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");

// ✅ Suppression sécurisée : bloque tout chemin hors du dossier uploads
const safeUnlink = async (relativeUrl) => {
    if (!relativeUrl) return;
    const filePath = path.resolve(process.cwd(), relativeUrl.replace(/^[/\\]/, ""));
    if (!filePath.startsWith(UPLOAD_DIR)) {
        console.error("[safeUnlink] Path traversal bloqué :", filePath);
        throw new Error("Chemin de fichier invalide");
    }
    try {
        await fs.unlink(filePath);
    } catch (err) {
        // Ignorer si le fichier est déjà absent (idempotent)
        if (err.code !== "ENOENT") throw err;
    }
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
    return await prisma.event.create({
        data: {
            title,
            type,
            imgUrl,
            content,
            date: new Date(date),
            organisationLocalId: Number(organisationLocalId)
        }
    })
}

export const createNational = async (title, type, imgUrl, content, date) =>{
    return await prisma.event.create({
        data: {
            title,
            type,
            imgUrl,
            content,
            date: new Date(date),
        }
    })
}

export const update = async (title, type, imgUrl, content, date, id) => {
    if(imgUrl) {
        const event = await prisma.event.findUnique({
            where: { id: Number(id) }
        });
         if (event?.imgUrl) {
            await safeUnlink(event.imgUrl);
        }
    }
    return await prisma.event.update({
        where: { id:Number(id) },
        data: {
            title,
            type,
            imgUrl,
            content,
            date: new Date(date),
        }
    })
}

export const deleteEvent = async (id) => {
    const event = await prisma.event.findUnique({
        where: { id: Number(id) }
    });

    if (!event) {
        throw new Error("Event not found");
        }
    await safeUnlink(event.imgUrl);
    return await prisma.event.delete({
        where: {id:Number(id) }
    })
}