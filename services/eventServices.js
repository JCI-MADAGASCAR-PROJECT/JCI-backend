import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";

export const fetchAllEvents = async () => {
    return await prisma.event.findMany({
        orderBy: {
            date: 'desc'
        },
    });
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

export const create = async (title, type, imgUrl, content, date, organisationLocalId) =>{
    return await prisma.event.create({
        data:{
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
        data:{
            title,
            type,
            imgUrl,
            content,
            date: new Date(date),
        }
    })
}

export const update = async (title, type, imgUrl, content, date, id) =>{
    if(imgUrl) {
        const event = await prisma.event.findUnique({
            where: { id: Number(id) }
        });
        if (event && event.imgUrl) {
            const filePath = path.join(
                process.cwd(),
                event.imgUrl.replace(/^[/\\]/, "")    
            );
            await fs.unlink(filePath);
        }
    }
    return await prisma.event.update({
        where:{id:Number(id)},
        data:{
            title,
            type,
            imgUrl,
            content,
            date: new Date(date),
        }
    })
}

export const deleteEvent = async (id) =>{
    const event = await prisma.event.findUnique({
        where: { id: Number(id) }
        });

        if (!event) {
        throw new Error("Event not found");
        }
        const filePath = path.join(
            process.cwd(),
            event.imgUrl.replace(/^[/\\]/, "")    
        );
    await fs.unlink(filePath);
    return await prisma.event.delete({
        where:{id:Number(id)}
    })
}