import * as bnService from "../services/bnServices.js";
import cache from "../utils/cache.js";

export const fetchAll = async (req, res) => {
    try {
        const CACHE_KEY = "bn_all";
        const CACHE_TTL = 60 * 60 * 24; // 24 heures

        const cached = cache.get(CACHE_KEY);

        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        
        const bureauxNationaux = await bnService.fetchAll();
        
        cache.set(CACHE_KEY, bureauxNationaux, CACHE_TTL);
        
        return res.status(200).json(bureauxNationaux);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Bureau National Members not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, firstName, title, imgUrl} = req.body;
        if(!name || !firstName || !title || !imgUrl){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await bnService.create(name, firstName, title, imgUrl);
        cache.del("bn_all");
        return res.status(201).json({message:"Membre du Bureau National ajouté !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Echec! Vérifiez si le titre fourni est déjà utilisé."});
    }
}

export const update = async (req, res) => {
    try {
        const {name, firstName, title, imgUrl} = req.body;
        const id = req.params.id;
        await bnService.update(name, firstName, title, imgUrl, id);
        cache.del("bn_all");
        return res.status(201).json({message:"Membre du Bureau National mis à jour !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Echec! Vérifiez si le titre fourni est déjà utilisé."});
    }
}
export const deleteBNMember = async (req, res) => {
    try {
        const id = req.params.id;
        await bnService.deleteBNMember(id);
        cache.del("bn_all");
        return res.status(201).json({message:"Membre du Bureau National supprimé !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Echec, Membre du Bureau National non supprimé !"});
    }
}