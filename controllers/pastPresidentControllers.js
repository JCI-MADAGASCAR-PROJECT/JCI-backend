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

export const fetchFirst = async (req, res) => {
    try {
        await pastPresidentService.fetchFirst();
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
        return res.status(200).json({message:"Past President deleted!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}