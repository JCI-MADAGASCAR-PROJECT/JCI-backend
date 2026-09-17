import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";

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
    if(imgUrl) {
        const zonePsd = await prisma.zonePresident.findUnique({
            where: { id: Number(id) }
        });
        if (zonePsd && zonePsd.imgUrl) {
            const filePath = path.join(
                process.cwd(),
                zonePsd.imgUrl.replace(/^[/\\]/, "")    
            );
            await fs.unlink(filePath);
        }
    }
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
    const psd = await prisma.zonePresident.findUnique({
        where: { id: Number(id) }
    });

    if (!psd) {
    throw new Error("Zone president not found");
    }
    const filePath = path.join(
        process.cwd(),
        psd.imgUrl.replace(/^[/\\]/, "")    
    );
    await fs.unlink(filePath);
    return await prisma.zonePresident.delete({
        where:{id:Number(id)}
    })
}