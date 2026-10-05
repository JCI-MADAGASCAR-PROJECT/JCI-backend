import * as pastPresidentService from "../services/pastPresidentServices.js";
import cache from "../utils/cache.js";

export const fetchAll = async (req, res) => {
    try {
        const CACHE_KEY = "past_presidents_all";
        const CACHE_TTL = 60 * 60 * 24; // 24 heures

        const cached = cache.get(CACHE_KEY);

        if (cached !== undefined) {
            return res.status(200).json(cached);
        }

        const pastPresidents = await pastPresidentService.fetchAll();

        cache.set(CACHE_KEY, pastPresidents, CACHE_TTL);

        return res.status(200).json(pastPresidents);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Past Presidents not fetched !"});
    }
}

export const fetchFirst = async (req, res) => {
    try {
        const CACHE_KEY = "past_president_first";
        const CACHE_TTL = 60 * 60 * 24; // 24 heures

        const cached = cache.get(CACHE_KEY);

        if (cached !== undefined) {
            return res.status(200).json(cached);
        }

        const pastPresident = await pastPresidentService.fetchFirst();
        cache.set(CACHE_KEY, pastPresident, CACHE_TTL);

        return res.status(200).json({ message: "Past Presidents fetched successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Past Presidents not fetched !"});
    }
}

export const create = async (req, res) => {
    try {
        const {name, year, imgUrl} = req.body;
        if(!name || !year || !imgUrl){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await pastPresidentService.create(name, year, imgUrl);
        cache.del("past_presidents_all");
        return res.status(201).json({message:"Past President created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const {name, year, imgUrl} = req.body;
        const id = req.params.id;
        await pastPresidentService.update(name, year, imgUrl, id);

        cache.del("past_presidents_all");

        return res.status(200).json({message:"Past President updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}
export const deletePastPresident = async (req, res) => {
    try {
        const id = req.params.id;
        await pastPresidentService.deletePastPresident(id);

        cache.del("past_presidents_all");

        return res.status(200).json({message:"Past President deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}