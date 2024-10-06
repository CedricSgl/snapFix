import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI ||"";
const client = new MongoClient(uri, {
    serverApi : {
        version : ServerApiVersion.v1,
        strict : true,
        deprecationErrors : true,
    },
});

try {
    await client.connect()
    await client.db("admin").command({ping: 1});
    console.log(
        "Pinged your deployement.  You succesfully connected to MongoDb"
    )
} catch (error) {
    console.error(err)
}

let db = client.db('immo-cards');

export default db;