import { MongoClient } from "mongodb";

export const getDatabaseConnection = async () => {
    const client = await MongoClient.connect(
        "mongodb+srv://rechie:iloveRuthy123@next-events.y3eop.mongodb.net/events?retryWrites=true&w=majority"
    );
    return client
}

export const insertDatabaseData = async (client, collection, data) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(data);
    return result
}

export const getCommentsByEvent = async (client, collection, eventId) => {
    const db = client.db();
    const eventComments = await db.collection(collection).find({ eventId: eventId }).toArray()
    return eventComments
}