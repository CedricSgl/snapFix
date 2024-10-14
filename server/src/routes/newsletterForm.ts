import { Response, Router } from "express";
import Request from "../types/Request";

import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import NewsletterForm, { TNewsletterForm } from "../models/newsletterForm";

const router: Router = Router();

router.post("/",
    [check("email", "Please include a valid email").isEmail()],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

        const newsletterField: TNewsletterForm = {
            email: req.body
        }

        try {
            const newsletterForm = new NewsletterForm(newsletterField);

            await newsletterForm.save()

            res.json(newsletterForm);

        } catch (err: any) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }

    })

export default router;