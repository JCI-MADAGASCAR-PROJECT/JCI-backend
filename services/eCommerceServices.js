import prisma from "../DB/db.config.js"
import { deleteFromOvh } from "../services/ovhSftp.js";

export const fetchAll = async () => {
    return await prisma.item.findMany({
        orderBy: {
            name: "asc"
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
    const itemId = Number(id);

    const existingItem = await prisma.item.findUnique({
        where:{id:itemId}
    });

    if (existingItem && existingItem.imgUrl && existingItem.imgUrl !== imgUrl) {
        await deleteFromOvh(existingItem.imgUrl);
    }

    return await prisma.item.update({
        where:{id:itemId},
        data:{
            name,
            description,
            price: parseFloat(price),
            imgUrl,
        }
    })
}

export const deleteItem = async (id) =>{
    const itemId = Number(id);
    const item = await prisma.item.findUnique({
        where:{id:itemId}
    });

    if (item && item.imgUrl) {
        await deleteFromOvh(item.imgUrl);
    }

    return await prisma.item.delete({
        where:{id:itemId}
    })
}