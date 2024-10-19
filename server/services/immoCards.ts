import { ObjectId } from "mongodb";
import { collections } from "../db/connection";
import { ImmoCard } from "../types/immoCards";


export async function findAllImmoCards():Promise<ImmoCard[]> {
    console.log('here we go')
    const results = (await collections?.immoCards?.find({}).limit(50).toArray() as unknown as ImmoCard[])
    if (!collections?.immoCards) {
        console.error('immoCards collection is undefined');
        return [];
    }
    return results;
}

export async function findOneById(id: ObjectId):Promise<ImmoCard |null> {
    const query = ({id})
    const result = (await collections?.immoCards?.findOne({_id: id})) as unknown as ImmoCard
    if (!result) {
        console.log(`No record found with id: ${id}`);
        return null;
    }else{
        console.log(result)
    }
    return result;
}

export async function insertOne(newImmo: ImmoCard):Promise<string | null> {
    try {
        const result = (await collections?.immoCards?.insertOne(newImmo)) as unknown as string
        console.log('here we are')
        console.log(newImmo)
        if(result/*?.insertedId*/){
            return result/*.insertedId.toString()*/;
        }else{
            console.error("Failed to insert Immo")
            return null;
        }
        
    } catch (error) {
        console.error('Error inserting ImmoCard : ', error)
        throw new Error('Error inserting ImmoCard')
    }

    ;
}