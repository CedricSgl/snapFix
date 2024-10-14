import { Document, model, Schema } from "mongoose"

export type TNewsletterForm = {
    email: string
}

export interface INewsletterForm extends TNewsletterForm, Document {}

const newsletterForm : Schema = new Schema({
    email: {
        type: String,
        required:true,
        unique: false
    }
})

const NewsletterForm = model<INewsletterForm>("newsletterForm", newsletterForm);

export default NewsletterForm;