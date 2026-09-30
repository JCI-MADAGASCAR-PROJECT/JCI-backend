import * as zonePresidentService from "../services/zonePresidentServices.js";

export const fetchPsd = async (req, res) => {
    try {
        const zonePresidents = await zonePresidentService.fetchPsd(req.params.zoneId);
        return res.status(200).json(zonePresidents);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone Presidents not fetched !"});
    }
}

export const fetchFirst = async (req, res) => {
    try {
        await zonePresidentService.fetchFirst();
        return res.status(200).json({ message: "Zone Presidents fetched successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone Presidents not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, quote, contact, imgUrl, zoneId} = req.body;
        if(!name || !quote || !contact || !imgUrl || !zoneId){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        await zonePresidentService.create(name, quote, contact, imgUrl, zoneId);
        return res.status(201).json({message:"Zone President created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone President not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, quote, contact, imgUrl, zoneId} = req.body;
        const id = req.params.id;
        await zonePresidentService.update(name, quote, contact, imgUrl, zoneId, id);
        return res.status(200).json({message:"Zone President updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone President not updated!"});
    }
}
export const deleteZonePresident = async (req, res) => {
    try {
        const id = req.params.id;
        await zonePresidentService.deleteZonePresident(id);
        return res.status(200).json({message:"Zone President deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone President not deleted!"});
    }
}