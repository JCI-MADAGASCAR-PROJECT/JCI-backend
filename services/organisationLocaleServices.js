import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";

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
            const filePath = path.join(
                process.cwd(),
                ol.mapImgUrl.replace(/^[/\\]/, "")    
            );
            await fs.unlink(filePath);
        }
    }
    if(logoImgUrl) {
        const ol = await prisma.organisationLocal.findUnique({
            where: { id: Number(id) }
        });
        if (ol && ol.logoImgUrl) {
            const filePath = path.join(
                process.cwd(),
                ol.logoImgUrl.replace(/^[/\\]/, "")    
            );
            await fs.unlink(filePath);
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
    const mapFilePath = path.join(
        process.cwd(),
        ol.mapImgUrl.replace(/^[/\\]/, "")    
    );
    const logoFilePath = path.join(
        process.cwd(),
        ol.logoImgUrl.replace(/^[/\\]/, "")    
    );
    console.log("mapFilePath:", mapFilePath);
    console.log("logoFilePath:", logoFilePath);
    await fs.unlink(mapFilePath);
    await fs.unlink(logoFilePath);
    return await prisma.organisationLocal.delete({
        where:{id:Number(id)}
    })
}