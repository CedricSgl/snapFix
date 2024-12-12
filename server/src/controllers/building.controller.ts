import { Pagination } from "../types/Pagination";
import { Request, Response, NextFunction } from "express";
import * as buildingsService from "../services/building.service";
import HttpStatusCodes from "http-status-codes";
import { validationResult } from "express-validator";

async function getAll(req: Request, res: Response, next: NextFunction){
    try {
        const query = req.query;
        const pagination: Pagination = {
            start: Number(query.start),
            size: Number(query.size)
        }
        const sorting = query.sorting;
        let sort = null
        if(JSON.parse(String(sorting))[0]){
            sort = {
                id: JSON.parse(String(sorting))[0].id,
                desc: JSON.parse(String(sorting))[0].desc
            }
        }
        const buildings = await buildingsService.getAll(pagination,sort)
        const totalBuildings = await buildingsService.count()
        const response = {
            status: 200,
            totalResults: totalBuildings,
            buildings: buildings.map(building => ({
                _id: building._id,
                name : building.name,
                address : building.address,
                responsible:building.responsible
                //...
            }))
        };
        res.json(response);
    } catch (error: any) {
        console.error(`Error while getting the building`, error.message);
        next(error)
    }
}

async function get(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await buildingsService.get(req.params.id));
    } catch (err: any) {
        console.error(`Error while getting the user`, err.message);
        next(err);
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    try {
        res.json(await buildingsService.create(req.body));
    } catch (err: any) {
        console.error(`Error while creating the building`, err.message);
        next(err);
    }
}

async function remove(req: Request, res: Response, next: NextFunction){
    try {
        res.json(await buildingsService.remove(req.params.id));
    } catch (error: any) {
        console.error(`Error while deleting the building`, error.message)
        next(error);
    }
}

//TODO Update, remove

export {getAll, get, create, remove}