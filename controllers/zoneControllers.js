import * as zoneService from "../services/zoneServices.js";
import * as organisationLocaleService from "../services/organisationLocaleServices.js";
import cache from "../utils/cache.js";


export const fetchAll = async (req, res) => {
    try {
        const CACHE_KEY = "zones_all";
        const CACHE_TTL = 60 * 60 * 24; // 24 heures
        
        const cached = cache.get(CACHE_KEY);
        console.log(cached !== undefined ? "CACHE HIT" : "CACHE MISS");
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        const zones = await zoneService.fetchAll();

        cache.set(CACHE_KEY, zones, CACHE_TTL);
        console.log("CACHE SET");

        return res.status(200).json(zones);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la récupération des zones !"});
    }
}
export const fetchByZoneName = async (req, res) => {
    try {
        const CACHE_KEY = `zone_${req.params.zoneName.toLowerCase()}`;
        const CACHE_TTL = 60 * 60 * 12; // 12 heures

        const cached = cache.get(CACHE_KEY);
        console.log(cached !== undefined ? "CACHE HIT" : "CACHE MISS");

        if (cached !== undefined) {
            return res.status(200).json(cached);
        }

        const zoneName = req.params.zoneName;
        const zone = await zoneService.fetchByZoneName(zoneName);

        cache.set(CACHE_KEY, zone, CACHE_TTL);
        console.log("CACHE SET");

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
        cache.del("zones_all");
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
        cache.del("zones_all");
        const zoneName = req.params.zoneName.toLowerCase();
        cache.del(`zone_${zoneName}`);
        console.log(`Cache for zone_${zoneName} deleted`);
        return res.status(200).json({message:"Zone mise à jour avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message});
    }
}
export const deleteZone = async (req, res) => {
    try {
        const id = req.params.id;
        const zoneName = req.params.zoneName.toLowerCase();
        const oldZone = await organisationLocaleService.fetchAllByZone(id);
        if (oldZone.length > 0) {
            return res.status(400).json({ message: "Cette zone ne peut pas être supprimée car elle contient des organisations locales."});
        }
        await zoneService.deleteZone(id);
        cache.del("zones_all");
        cache.del(`zone_${zoneName}`);
        return res.status(200).json({message:"Zone supprimée avec succès !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la suppression de la zone !"});
    }
}