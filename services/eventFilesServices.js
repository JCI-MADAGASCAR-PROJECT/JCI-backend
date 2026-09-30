import prisma from "../DB/db.config.js"
import fs from "fs/promises";
import path from "path";
import { deleteFromOvh } from "../services/ovhSftp.js";


export const fetchAllByEventId = async (eventId) => {
    return await prisma.eventFile.findMany({
        where: {
            eventId: Number(eventId)
        }
    });
};


export const create = async (fileUrl, eventId) =>{
    return await prisma.eventFile.create({
        data:{
            fileUrl,
            eventId: Number(eventId)
        }
    })
}

// export const update = async (fileUrl, eventId, id) =>{
//     return await prisma.eventFile.update({
//         where:{id:Number(id)},
//         data:{
//             fileUrl,
//             eventId: Number(eventId),
//         }
//     })
// }

export const deleteEventFile = async (id) =>{
    const eventFile = await prisma.eventFile.findUnique({
        where: { id: Number(id) }
        });

        if (!eventFile) {
        throw new Error("Event file not found");
        }
        await deleteFromOvh(eventFile.fileUrl); 
    return await prisma.eventFile.delete({
        where:{id:Number(id)}
    })
}