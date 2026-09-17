import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";

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
        const filePath = path.join(
            process.cwd(),
            member.imgUrl.replace(/^[/\\]/, "")
        );
        await fs.unlink(filePath);
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
    const filePath = path.join(
        process.cwd(),
        member.imgUrl.replace(/^[/\\]/, "")    
    );
    await fs.unlink(filePath);
    return await prisma.member.delete({
        where:{id:Number(id)}
    })
}