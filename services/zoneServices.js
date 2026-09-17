import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";


export const fetchAll = async () => {
    return await prisma.zone.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const fetchByZoneName = async (zoneName) => {
    return await prisma.zone.findUnique({
        where: { name: zoneName }
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
    if(imgUrl) {
        const zone = await prisma.zone.findUnique({
            where: { id: Number(id) }
        });
        if (zone && zone.imgUrl) {
            const filePath = path.join(
                process.cwd(),
                zone.imgUrl.replace(/^[/\\]/, "")    
            );
            await fs.unlink(filePath);
        }
    }
    return await prisma.zone.update({
        where:{id:Number(id)},
        data:{
            name,
            imgUrl,
        }
    })
}

export const deleteZone = async (id) =>{
    const zone = await prisma.zone.findUnique({
        where: { id: Number(id) }
    });

    if (!zone) {
    throw new Error("Zone not found");
    }
    if (zone && zone.imgUrl) {
        const filePath = path.join(
            process.cwd(),
            zone.imgUrl.replace(/^[/\\]/, "")    
        );
        console.log("filePath:", filePath);
        await fs.unlink(filePath);
    }
    return await prisma.zone.delete({
        where:{id:Number(id)}
    })
}