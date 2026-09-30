import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";
import { deleteFromOvh } from "../services/ovhSftp.js";

export const fetchAllByZone = async (zoneId) => {
    return await prisma.organisationLocal.findMany({
        orderBy: {
            name: "asc"
        },
        where: {
            zoneId: Number(zoneId)
        }
    });
};

export const fetchAllByiD = async (id) => {
    return await prisma.organisationLocal.findFirst({
        where: {
            id: Number(id)
        }
    });
};

export const fetchAllId = async () => {
    return await prisma.organisationLocal.findMany({
        where: {
            users: {
                none: {}
            }
        },
        select: {
            id: true,
            name: true
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

export const update = async (name, localisation, phone, email, mapImgUrl, logoImgUrl, id) =>{
   if(mapImgUrl) {
        const ol = await prisma.organisationLocal.findUnique({
            where: { id: Number(id) }
        });
        if (ol && ol.mapImgUrl) {
            await deleteFromOvh(ol.mapImgUrl);
        }
    }
    if(logoImgUrl) {
        const ol = await prisma.organisationLocal.findUnique({
            where: { id: Number(id) }
        });
        if (ol && ol.logoImgUrl) {
            await deleteFromOvh(ol.logoImgUrl);
        }
    }
    return await prisma.organisationLocal.update({
        where:{id:Number(id)},
        data:{
            name,
            localisation,
            phone,
            email,
            mapImgUrl,
            logoImgUrl
        }
    })
}

export const deleteOrganisationLocal = async (id) =>{
    const ol = await prisma.organisationLocal.findUnique({
        where: { id: Number(id) }
    });

    if (!ol) {
        throw new Error("Organisation Local not found");
    }
    await deleteFromOvh(ol.mapImgUrl);
    await deleteFromOvh(ol.logoImgUrl);
    return await prisma.organisationLocal.delete({
        where:{id:Number(id)}
    })
}