import * as pastPresidentService from "../services/pastPresidentServices.js";

export const fetchAll = async (req, res) => {
    try {
        const pastPresidents = await pastPresidentService.fetchAll();
        return res.status(200).json(pastPresidents);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Past Presidents not fetched !"});
    }
}


export const create = async (req, res) => {
    try {
        const {name, year, imgUrl} = req.body;
        console.log(req.body);
        await pastPresidentService.create(name, year, imgUrl);
        return res.status(201).json({message:"Past President created!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Past President not created !"});
    }
}

export const update = async (req, res) => {
    try {
        const {name, year, imgUrl} = req.body;
        const id = req.params.id;
        await pastPresidentService.update(name, year, imgUrl, id);
        return res.status(201).json({message:"Past President updated!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Past President not updated!"});
    }
}
export const deletePastPresident = async (req, res) => {
    try {
        const id = req.params.id;
        await pastPresidentService.deletePastPresident(id);
        return res.status(201).json({message:"Past President deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Past President not deleted!"});
    }
}