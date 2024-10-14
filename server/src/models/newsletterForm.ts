import { Document, model, Schema } from "mongoose"

export type TNewsletterForm = {
    email: string
}

export interface INewsletterForm extends TNewsletterForm, Document {}

const newsletterFormSchema : Schema = new Schema({
    email: {
        type: String,
        required:true,
        unique: false
    }
})

const NewsletterForm = model<INewsletterForm>("NewsletterForm", newsletterFormSchema);

export default NewsletterForm;