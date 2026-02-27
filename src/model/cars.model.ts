import mongoose from "mongoose";

export interface ICars extends Document {
    name : string;
    brand : string;
    model: string;
    fuel: "Petrol" | "Diesel" | "EV" ; 
    price : string;
    Publishdate : string;
    image?: string;
}



const CarSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    brand:{ type: String, required : true},
    model : {type: String, required : true},
    fuel : {type: String, required : true, enum : ["Petrol", "Diesel", "EV"], default : "Diesel"},
    price : {type: String, required : true},
    Publishdate : {type: String, required : true},
    image: { type: String },
},{timestamps: true});

export default mongoose.model<ICars>("Car", CarSchema); 