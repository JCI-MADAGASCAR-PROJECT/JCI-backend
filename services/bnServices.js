import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";


export const fetchAll = async () => {
    return await prisma.bureauNational.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const create = async (name, firstName, title, imgUrl) =>{
    const existingTitle = await prisma.bureauNational.findUnique({
        where: { title }
    });
    if (existingTitle) {
        throw new Error("Title already exists");
    }
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
    const existingTitle = await prisma.bureauNational.findUnique({
        where: { title ,
            NOT: {
            id: Number(id),
            },
        },
    });
    if (existingTitle) {
        throw new Error("Title already exists");
    }
    if (imgUrl) {
        const member = await prisma.bureauNational.findUnique({
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
    const member = await prisma.bureauNational.findUnique({
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
    return await prisma.bureauNational.delete({
        where:{id:Number(id)}
    })
}