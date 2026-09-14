import * as eCommerceService from "../services/eCommerceServices.js";

export const fetchAll = async (req, res) => {
    try {
        const items = await eCommerceService.fetchAll();
        return res.status(200).json({items});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Items not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, description, price: priceStr, imgUrl} = req.body;
        const price = parseFloat(priceStr);
        await eCommerceService.create(name, description, price, imgUrl);
        return res.status(201).json({message:"Item created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Item not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, description, price: priceStr, imgUrl} = req.body;
        const id = req.params.id;
        await eCommerceService.update(name, description, parseFloat(priceStr), imgUrl, id);
        return res.status(201).json({message:"Item updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Item not updated!"});
    }
}
export const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await eCommerceService.deleteItem(id);
        return res.status(201).json({message:"Item deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Item not deleted!"});
    }
}