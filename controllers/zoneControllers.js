import * as zoneService from "../services/zoneServices.js";
import * as organisationLocaleService from "../services/organisationLocaleServices.js";


export const fetchAll = async (req, res) => {
    try {
        const zones = await zoneService.fetchAll();
        return res.status(200).json(zones);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la récupération des zones !"});
    }
}
export const fetchByZoneName = async (req, res) => {
    try {
        const zoneName = req.params.zoneName;
        const zone = await zoneService.fetchByZoneName(zoneName);
        return res.status(200).json(zone);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la récupération de la zone !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, imgUrl} = req.body;
        if(!name || !imgUrl){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await zoneService.create(name, imgUrl);
        return res.status(201).json({message:"Zone créée avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la création de la zone !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, imgUrl} = req.body;
        const id = req.params.id;
        await zoneService.update(name, imgUrl, id);
        return res.status(200).json({message:"Zone mise à jour avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour de la zone !"});
    }
}
export const deleteZone = async (req, res) => {
    try {
        const id = req.params.id;
        const oldZone = await organisationLocaleService.fetchAllByZone(id);
        if (oldZone.length > 0) {
            return res.status(400).json({ message: "Cette zone ne peut pas être supprimée car elle contient des organisations locales."});
        }
        await zoneService.deleteZone(id);
        return res.status(200).json({message:"Zone supprimée avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la suppression de la zone !"});
    }
}