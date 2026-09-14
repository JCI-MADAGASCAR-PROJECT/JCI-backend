import prisma from "../DB/db.config.js"

export const fetchAll = async () => {
    return await prisma.item.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const create = async (name, description, price, imgUrl) =>{
    return await prisma.item.create({
        data:{
            name,
            description,
            price: parseFloat(price),
            imgUrl
        }
    })
}

export const update = async (name, description, price, imgUrl, id) =>{
    return await prisma.item.update({
        where:{id:Number(id)},
        data:{
            name,
            description,
            price: parseFloat(price),
            imgUrl,
        }
    })
}

export const deleteItem = async (id) =>{
    return await prisma.item.delete({
        where:{id:Number(id)}
    })
}