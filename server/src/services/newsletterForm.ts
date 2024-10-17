import NewsletterForm, { TNewsletterForm } from "../models/newsletterForm";

export async function saveNewsletterForm(newsletterField: TNewsletterForm) {

    try {
        const newsletterForm = new NewsletterForm(newsletterField);

        await newsletterForm.save()

        return newsletterForm;

    } catch (err: any) {
        throw new Error("Server error");
    }
}