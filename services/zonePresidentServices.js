import prisma from "../DB/db.config.js"

export const fetchPsd = async (zoneId) => {
    return await prisma.zonePresident.findFirst({
        where: {
            zoneId: Number(zoneId)
        }
    });
};

export const create = async (name, quote, contact, imgUrl, zoneId) =>{
    return await prisma.zonePresident.create({
        data:{
            name,
            quote,
            contact,
            imgUrl,
            zoneId: Number(zoneId)
        }
    })
}

export const update = async (name, quote, contact, imgUrl, zoneId, id) =>{
    return await prisma.zonePresident.update({
        where:{id:Number(id)},
        data:{
            name,
            quote,
            contact,
            imgUrl,
            zoneId: Number(zoneId),
        }
    })
}

export const deleteZonePresident = async (id) =>{
    return await prisma.zonePresident.delete({
        where:{id:Number(id)}
    })
}