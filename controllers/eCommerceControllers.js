import * as eCommerceService from "../services/eCommerceServices.js";
import cache from "../utils/cache.js";

export const fetchAll = async (req, res) => {
    try {
        const CACHE_KEY = "items_all";
        const CACHE_TTL = 60 * 60 * 1; // 1 heure
        const cached = cache.get(CACHE_KEY);
        if (cached !== undefined) {
            return res.status(200).json(cached);
        }
        const items = await eCommerceService.fetchAll();
        cache.set(CACHE_KEY, items, CACHE_TTL);
        console.log("Items fetched from database and cached.");
        return res.status(200).json(items);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Items non récupérés !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, description, priceStr, imgUrl} = req.body;
        const price = parseFloat(priceStr);
        await eCommerceService.create(name, description, price, imgUrl);
        cache.del("items_all");
        console.log("Items cache cleared after creating new item.");
        return res.status(201).json({message:"Item ajouté"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Item non ajouté !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, description, priceStr, imgUrl} = req.body;
        const id = req.params.id;
        await eCommerceService.update(name, description, parseFloat(priceStr), imgUrl, id);
        cache.del("items_all");
        console.log(`Items cache cleared after update item ${id}.`);
        return res.status(201).json({message:"Item modifié !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Item non modifié !"});
    }
}
export const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await eCommerceService.deleteItem(id);
        cache.del("items_all");
        console.log(`Items cache cleared after delete item ${id}.`);
        return res.status(201).json({message:"Item supprimé !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Item non supprimé !"});
    }
}