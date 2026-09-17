import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";
export const fetchAll = async () => {
    return await prisma.pastPresident.findMany({
        orderBy: {
            id: "desc"
        }
    });
};

export const create = async (name, year, imgUrl) =>{
    return await prisma.pastPresident.create({
        data:{
            name,
            year:Number(year),
            imgUrl
        }
    })
}

export const update = async (name, year, imgUrl, id) =>{
    if(imgUrl) {
        const pp = await prisma.pastPresident.findUnique({
            where: { id: Number(id) }
        });
        if (pp && pp.imgUrl) {
            const filePath = path.join(
                process.cwd(),
                pp.imgUrl.replace(/^[/\\]/, "")    
            );
            await fs.unlink(filePath);
        }
    }
    return await prisma.pastPresident.update({
        where:{id:Number(id)},
        data:{
            name,
            year:Number(year),
            imgUrl,
        }
    })
}

export const deletePastPresident = async (id) =>{
    const pp = await prisma.pastPresident.findUnique({
    where: { id: Number(id) }
    });

    if (!pp) {
    throw new Error("Past president not found");
    }
    const filePath = path.join(
        process.cwd(),
        pp.imgUrl.replace(/^[/\\]/, "")    
    );
    await fs.unlink(filePath);
    return await prisma.pastPresident.delete({
        where:{id:Number(id)}
    })
}