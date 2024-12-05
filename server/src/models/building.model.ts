import { Document, model, Schema } from "mongoose"

export type TBuilding = {
    name: string,
    address: string,
    photos: string,
    responsible: string,
    managedBy: string
}

export interface IBuilding extends TBuilding, Document {};

const SBuilding : Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        unique: false
    },
    photos: {
        type: String,
        required: false,
        unique: false
    },
    responsible: {
        type: String,
        required: false,
        unique: false
    }
})

const Building = model<IBuilding>("buildings", SBuilding);

export default Building;