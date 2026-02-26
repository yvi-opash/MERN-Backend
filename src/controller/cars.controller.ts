import { Request, Response } from "express";
import car from "../model/cars.model";

export const createCar = async (req: Request, res: Response) => {
    try {

        const cars = new car(req.body);

        if(!cars.name || !cars.brand || !cars.model || !cars.fuel || !cars.price || !cars.Publishdate){
            return res.status(400).json({ message: "All fields are required" });
        }

        await cars.save();
        res.status(201).json(cars);
        
    } catch (err) {
        res.status(500).json({ message: "Error creating car", error: err });
    }
}

export const getallCar  = async(req: Request, res: Response) => {
    try{
        const page = parseInt(req.query.page as string) || 0;
        const limit = parseInt(req.query.limit as string) || 5;
        const search = req.query.search as string || "";
        
        const query = search ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { model: { $regex: search, $options: "i" } },
                { fuel: { $regex: search, $options: "i" } }
            ]
        } : {};
        
        const cars = await car.find(query)
            .skip(page * limit)
            .limit(limit);
        
        const total = await car.countDocuments(query);
        
        res.json({ cars, total });
    } catch (err) {
        res.status(500).json({ message: "Error fetching cars", error: err });
    }
}


export const deleteCar = async (req : Request, res: Response) => {
    try {
        await car.findByIdAndDelete(req.params.id);
        res.json({ message: "Car deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting car", error: err });
    }
};

export const updateCar = async (req: Request, res: Response) => {
    try {
        const cars = await car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: "Error updating car", error: err });
    }
}