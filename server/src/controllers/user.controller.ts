import { Request, Response, NextFunction } from "express";
import * as usersService from "../services/user.service";
import { validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import { Query, QueryOptions } from "mongoose";
import { Pagination } from "../types/Pagination";
import { Sort } from "../types/Sort";

async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.query;

        const pagination: Pagination = {
            start: Number(query.start),
            size: Number(query.size),
        }
        const sorting = query.sorting;
        let sort = null
        if (JSON.parse(String(sorting))[0]) {
            sort = {
                id: JSON.parse(String(sorting))[0].id,
                desc: JSON.parse(String(sorting))[0].desc
            }
        }

        const users = await usersService.getAll(pagination, sort)
        const totalUsers = await usersService.count();
        const response = {
            status: 200,
            totalResults: totalUsers,    // Total number of notes in the current page
            users: users.map(user => ({    // Map each note to a simplified object
                _id: user._id,
                emailAddress: user.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                __v: user.__v
            }))
        };
        res.json(response);
    } catch (err: any) {
        console.error(`Error while getting the users`, err.message);
        next(err);
    }
}

async function get(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await usersService.get(req.params.id));
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
        res.json(await usersService.create(req.body));
    } catch (err: any) {
        console.error(`Error while creating the user`, err.message);
        next(err);
    }
}

async function update(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await usersService.update(req.params.id, req.body));
    } catch (err: any) {
        console.error(`Error while updating the user`, err.message);
        next(err);
    }
}

async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await usersService.remove(req.params.id));
    } catch (err: any) {
        console.error(`Error while deleting the list`, err.message);
        next(err);
    }
}

export { getAll, get, create, update, remove };