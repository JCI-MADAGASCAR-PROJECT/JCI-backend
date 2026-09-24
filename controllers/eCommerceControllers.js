import * as eCommerceService from "../services/eCommerceServices.js";

export const fetchAll = async (req, res) => {
    try {
        const items = await eCommerceService.fetchAll();
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
        return res.status(201).json({message:"Item supprimé !"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Item non supprimé !"});
    }
}