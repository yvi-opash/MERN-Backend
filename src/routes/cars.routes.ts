import { Router } from "express";
import { createCar , getallCar , deleteCar, updateCar} from "../controller/cars.controller";
import { upload } from "../middleware/upload";


const route = Router();

route.post("/", upload.single("image"), createCar);
route.get("/", getallCar);
route.delete("/:id", deleteCar);
route.put("/:id", upload.single("image"), updateCar);

export default route;