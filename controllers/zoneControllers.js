import * as zoneService from "../services/zoneServices.js";

export const fetchAll = async (req, res) => {
    try {
        const zones = await zoneService.fetchAll();
        return res.status(200).json(zones);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zones not fetched !"});
    }
}
export const fetchByZoneName = async (req, res) => {
    try {
        const zoneName = req.params.zoneName;
        const zone = await zoneService.fetchByZoneName(zoneName);
        return res.status(200).json(zone);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, imgUrl} = req.body;
        await zoneService.create(name, imgUrl);
        return res.status(201).json({message:"Zone created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, imgUrl} = req.body;
        const id = req.params.id;
        await zoneService.update(name, imgUrl, id);
        return res.status(201).json({message:"Zone updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone not updated!"});
    }
}
export const deleteZone = async (req, res) => {
    try {
        const id = req.params.id;
        await zoneService.deleteZone(id);
        return res.status(201).json({message:"Zone deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Zone not deleted!"});
    }
}