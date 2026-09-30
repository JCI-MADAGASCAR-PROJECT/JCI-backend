import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";
import { deleteFromOvh } from "../services/ovhSftp.js";

export const fetchAllByOrganisationLocal = async (organisationLocalId) => {
    return await prisma.member.findMany({
        orderBy: {
            id: 'asc'
        },
        where: {
            organisationLocalId: Number(organisationLocalId)
        }
    });
};

export const create = async (name, imgUrl, title, ticket, organisationLocalId) =>{
    return await prisma.member.create({
        data:{
            name,
            imgUrl,
            title,
            ticket,
            organisationLocalId: Number(organisationLocalId)
        }
    })
}

export const update = async (name, imgUrl, title, ticket, id) =>{
    if (imgUrl) {
    const member = await prisma.member.findUnique({
        where: { id: Number(id) }
    });
    if (member && member.imgUrl) {
        await deleteFromOvh(member.imgUrl);
        }
    }
    return await prisma.member.update({
        where:{id:Number(id)},
        data:{
            name,
            imgUrl,
            title,
            ticket,
        }
    })
}

export const deleteMember = async (id) =>{
    const member = await prisma.member.findUnique({
        where: { id: Number(id) }
    });

    if (!member) {
    throw new Error("Member not found");
    }
    await deleteFromOvh(member.imgUrl);
    return await prisma.member.delete({
        where:{id:Number(id)}
    })
}