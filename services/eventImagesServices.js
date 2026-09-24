import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";

export const fetchAllByEventId = async (eventId) => {
    return await prisma.eventImage.findMany({
        where: {
            eventId: Number(eventId)
        }
    });
};


export const create = async (imgUrl, eventId) =>{
    return await prisma.eventImage.create({
        data:{
        
            imgUrl,
            eventId: Number(eventId)
        }
    })
}

// export const update = async (imgUrl, eventId, id) =>{
//     return await prisma.eventImage.update({
//         where:{id:Number(id)},
//         data:{
//             imgUrl,
//             eventId: Number(eventId),
//         }
//     })
// }

export const deleteEventImage = async (id) =>{
    const eventImage = await prisma.eventImage.findUnique({
        where: { id: Number(id) }
        });

        if (!eventImage) {
        throw new Error("Event image not found");
        }
        const filePath = path.join(
            process.cwd(),
            eventImage.imgUrl.replace(/^[/\\]/, "")    
        );
    await fs.unlink(filePath);
    return await prisma.eventImage.delete({
        where:{id:Number(id)}
    })
}