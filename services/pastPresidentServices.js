import prisma from "../DB/db.config.js"

export const fetchAll = async () => {
    return await prisma.pastPresident.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const create = async (name, year, imgUrl) =>{
    return await prisma.pastPresident.create({
        data:{
            name,
            year:Number(year),
            imgUrl
        }
    })
}

export const update = async (name, year, imgUrl, id) =>{
    return await prisma.pastPresident.update({
        where:{id:Number(id)},
        data:{
            name,
            year:Number(year),
            imgUrl,
        }
    })
}

export const deletePastPresident = async (id) =>{
    return await prisma.pastPresident.delete({
        where:{id:Number(id)}
    })
}