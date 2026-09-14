import prisma from "../DB/db.config.js"

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
    return await prisma.eventFile.delete({
        where:{id:Number(id)}
    })
}