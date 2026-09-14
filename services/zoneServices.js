import prisma from "../DB/db.config.js"

export const fetchAll = async () => {
    return await prisma.zone.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const create = async (name, imgUrl) =>{
    return await prisma.zone.create({
        data:{
            name,
            imgUrl
        }
    })
}

export const update = async (name, imgUrl, id) =>{
    return await prisma.zone.update({
        where:{id:Number(id)},
        data:{
            name,
            imgUrl,
        }
    })
}

export const deleteZone = async (id) =>{
    return await prisma.zone.delete({
        where:{id:Number(id)}
    })
}