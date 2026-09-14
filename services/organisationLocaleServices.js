import prisma from "../DB/db.config.js"

export const fetchAllByZone = async (zoneId) => {
    return await prisma.organisationLocal.findMany({
        where: {
            zoneId: Number(zoneId)
        }
    });
};

export const create = async (name, localisation, phone, email, mapImgUrl, logoImgUrl, zoneId) =>{
    return await prisma.organisationLocal.create({
        data:{
            name,
            localisation,
            phone,
            email,
            mapImgUrl,
            logoImgUrl,
            zoneId: Number(zoneId)
        }
    })
}

export const update = async (name, localisation, phone, email, mapImgUrl, logoImgUrl, zoneId, id) =>{
    return await prisma.organisationLocal.update({
        where:{id:Number(id)},
        data:{
            name,
            localisation,
            phone,
            email,
            mapImgUrl,
            logoImgUrl,
            zoneId: Number(zoneId),
        }
    })
}

export const deleteOrganisationLocal = async (id) =>{
    return await prisma.organisationLocal.delete({
        where:{id:Number(id)}
    })
}