import prisma from "../DB/db.config.js"

export const fetchAllEvents = async () => {
    return await prisma.event.findMany();
};

export const fetchAllEventsByOrganisationLocal = async (organisationLocalId) => {
    return await prisma.event.findMany({
        where: {
            organisationLocalId: Number(organisationLocalId)
        }
    });
};

export const fetchAllEventsByNational = async () => {
    return await prisma.event.findMany({
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
            date,
            organisationLocalId: Number(organisationLocalId)
        }
    })
}

export const update = async (title, type, imgUrl, content, date, organisationLocalId, id) =>{
    return await prisma.event.update({
        where:{id:Number(id)},
        data:{
            title,
            type,
            imgUrl,
            content,
            date,
            organisationLocalId: Number(organisationLocalId),
        }
    })
}

export const deleteEvent = async (id) =>{
    return await prisma.event.delete({
        where:{id:Number(id)}
    })
}