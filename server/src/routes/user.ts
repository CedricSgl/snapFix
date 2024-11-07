import { Response, Router } from "express";
import Request from "../types/Request";
import { createUser, deleteUser, getUser, listUsers, updateUser } from "../services/user";
import HttpStatusCodes from "http-status-codes";
import { check, validationResult } from "express-validator";
import { TUser } from "../models/user";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        listUsers().then(function (users) {
            res.json(users)
        })
    } catch (err: any) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        getUser(id).then(function (user) {
            res.json(user)
        })
    } catch (err: any) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
})

router.post("/",
    [check("emailAddress", "Please include a valid email").isEmail()],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        const userField: TUser = {
            emailAddress: req.body.emailAddress,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        try {
            createUser(userField).then(function (u) {
                res.json(u);
            })

        } catch (err: any) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }

    })

router.delete("/:id",
    async (req: Request, res: Response) => {
        const id = req.params.id;
    
        try {
            deleteUser(id)
            res.json({success: true}).status(HttpStatusCodes.OK)

        } catch (err: any) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }

    })

export default router;