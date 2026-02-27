import { Request, Response } from "express";
import Car from "../model/cars.model";
import cloudinary from "../config/cloudinary";


export const createCar = async (req: Request, res: Response) => {
  try {
    const { name, brand, model, fuel, price, Publishdate } = req.body;

    if (!name || !brand || !model || !fuel || !price || !Publishdate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = "";
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "cars",
      });
      imageUrl = result.secure_url;
    }

    const newCar = await Car.create({
      name,
      brand,
      model,
      fuel,
      price,
      Publishdate,
      image: imageUrl,
    });

    res.status(201).json(newCar);
  } catch (error: any) {
    console.error("CREATE CAR ERROR:", error);
    res.status(500).json({
      message: "Error creating car",
      error: error.message,
    });
  }
};


export const getallCar = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { brand: { $regex: search, $options: "i" } },
            { model: { $regex: search, $options: "i" } },
            { fuel: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const cars = await Car.find(query)
      .skip(page * limit)
      .limit(limit)
      

    const total = await Car.countDocuments(query);

    res.status(200).json({
      cars,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error("GET ALL CARS ERROR:", error);

    res.status(500).json({
      message: "Error fetching cars",
      error: error.message,
    });
  }
};


export const deleteCar = async (req: Request, res: Response) => {
  try {
    await Car.findByIdAndDelete(req.params.id);

    res.json({ message: "Car deleted successfully" });
  } catch (error: any) {
    console.error("DELETE CAR ERROR:", error);

    res.status(500).json({
      message: "Error deleting car",
      error: error.message,
    });
  }
};


export const updateCar = async (req: Request, res: Response) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "cars",
      });
      updateData.image = result.secure_url;
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedCar);
  } catch (error: any) {
    console.error("UPDATE CAR ERROR:", error);

    res.status(500).json({
      message: "Error updating car",
      error: error.message,
    });
  }
};