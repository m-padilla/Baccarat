import dontenv from 'dotenv';
import {MongoClient} from 'mongodb';

const mongo = () =>{
    // Load in our enviorment variable fomr .env file
    dontenv.config();

    // Destructering the dotenv proccess object.
    const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
    const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    
    let client;
    let db;

    async function connect(){
        try{
            client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();
            console.log('Connected to MongoDB');
        }
        catch(err){
            console.error(err);
        }

    }

    async function close(){
        try{
            await client.close();
            console.log('Disconnected to MongoDB');
        }
        catch(err){
            console.error(err);
        }
    }

    async function create (collectionName, data){
        try{
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        }
        catch(err){
            console.error(err);
        }

    }

    async function update (collectionName, deckIdentifier, data){
        try{
            const collection = db.collection(collectionName);
            await collection.updateOne(
                { deckId: deckIdentifier},
                { $set: data}
            );

        }
        catch(err){
            console.error(err);
        }
    }

    async function find (collectionName, deckIdentifier){
        try{
            const collection = db.collection(collectionName);
            if(deckIdentifier){
                const cursor = await collection.find({deckId: deckIdentifier});
                return cursor;
            }
            else{
                const cursor = await collection.find({});
                return cursor;
            }
        }
        catch(err){
            console.error(err);
        }
    }


    return {
        connect,
        close,
        create,
        update,
        find
    }
};

export default mongo();
