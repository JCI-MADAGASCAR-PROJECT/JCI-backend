import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";
import { deleteFromOvh } from "../services/ovhSftp.js";


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
    const existingZone = await fetchByZoneName(name);
    if (existingZone) {
        throw new Error("Zone with this name already exists");
    }
    return await prisma.zone.create({
        data:{
            name,
            imgUrl
        }
    })
}

export const update = async (name, imgUrl, id) =>{
    const existingZone = await fetchByZoneName(name);
    if (existingZone && existingZone.id !== Number(id)) {
        throw new Error("Zone with this name already exists");
    }
    if(imgUrl) {
        const zone = await prisma.zone.findUnique({
            where: { id: Number(id) }
        });
        if (zone && zone.imgUrl) {
            await deleteFromOvh(zone.imgUrl);
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
        await deleteFromOvh(zone.imgUrl);
    }
    return await prisma.zone.delete({
        where:{id:Number(id)}
    })
}