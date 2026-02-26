import { Router } from "express";
import { createCar , getallCar , deleteCar, updateCar} from "../controller/cars.controller";
import { get } from "mongoose";


const route = Router();

route.post("/", createCar);
route.get("/", getallCar);
route.delete("/:id", deleteCar);
route.put("/:id", updateCar);

export default route;