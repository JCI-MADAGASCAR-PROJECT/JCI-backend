import * as eventFilesService from "../services/eventFilesServices.js";

export const fetchAllByEventId = async (req, res) => {
    try {
        const eventFiles = await eventFilesService.fetchAllByEventId(req.params.eventId);
        return res.status(200).json(eventFiles);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Event files not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {fileUrl, eventId} = req.body;
        if(!fileUrl || !eventId){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await eventFilesService.create(fileUrl, eventId);
        return res.status(201).json({message:"Fichier d'événement ajouté avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Fichier d'événement non ajouté !" });
    }
}

// export const update = async (req, res) => {
//     try {
//         const {fileUrl, eventId} = req.body;
//         const id = req.params.id;
//         await eventFilesService.update(fileUrl, eventId, id);
//         return res.status(200).json({message:"Event file updated!"});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Event file not updated!"});
//     }
// }
export const deleteEventFile = async (req, res) => {
    try {
        const id = req.params.id;
        await eventFilesService.deleteEventFile(id);
        return res.status(200).json({message:"Fichier d'événement supprimé avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Fichier d'événement non supprimé !" });
    }
}