import { ValidationError } from "express-validator";
import Building, { TBuilding } from "../models/building.model";
import { Pagination } from "../types/Pagination";
import { Sort } from "../types/Sort";
import { errorsCode } from "../utils/error";


type BuildingUpdate = Partial<{
    name: string,
    address: string,
    photos: string,
    responsible: string,
    managedBy: string
}>;

// For Pagination
const DEFAULT_SIZE = 10;
const DEFAULT_PAGE = 0;

async function getAll(pagination: Pagination, sort: Sort | null){
    try {
        const start = pagination.start || DEFAULT_PAGE;
        const size = pagination.size || DEFAULT_SIZE;
        if (sort){
            return await Building.find().sort({[`${sort?.id}`]: sort?.desc ? "desc" : "asc"}).skip(start).limit(size);
        }
        return await Building.find().skip(start).limit(size)
    }
    catch(err: any){
        throw new Error("Server error");
    }
}

async function get(id: string) {
    try {
        return await Building.findById(id);
    }catch(err: any){
        throw new Error("Server error")
    }
}

async function create(building : TBuilding): Promise<TBuilding | ValidationError | Array<ValidationError>>{
    try{
        const buildingToSave = new Building(building);
        return await buildingToSave.save();
    }catch(err: any){
        let errors:Array<ValidationError> = [];
        if (err.code = errorsCode.DUPLICATE_KEY_EXCEPTION) {
            const v = transformKeyValueToErrorFields(err.keyValue);
            v.errorFields.forEach(errorField => {
                errors.push({
                    type: 'field',
                    path: errorField.name,
                    msg: "Duplicate object",
                    location: 'body',
                    value: errorField.value
                })
            });
            return errors
        }
        throw new Error("Server error"); 
    }
}

function count() {
    return Building.countDocuments()
}

//TODO Update and remove

function transformKeyValueToErrorFields(keyValue: any) {
    return {
        errorFields: Object.entries(keyValue).map(([key, value]) => ({
            name: key,
            value: value
        }))
    };
}

export { getAll, get, create, count}