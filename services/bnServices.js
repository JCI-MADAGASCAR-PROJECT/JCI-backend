import prisma from "../DB/db.config.js"

export const fetchAll = async () => {
    return await prisma.bureauNational.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const create = async (name, firstName, title, imgUrl) =>{
    return await prisma.bureauNational.create({
        data:{
            name,
            firstName,
            title,
            imgUrl
        }
    })
}

export const update = async (name, firstName, title, imgUrl, id) =>{
    return await prisma.bureauNational.update({
        where:{id:Number(id)},
        data:{
            name,
            firstName,
            title,
            imgUrl,
        }
    })
}

export const deleteBNMember = async (id) =>{
    return await prisma.bureauNational.delete({
        where:{id:Number(id)}
    })
}