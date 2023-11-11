import { connect, disconnect } from "mongoose";

export default async function connectToDB() {
    try {
        const options = {
            dbName: 'mgdb',
        }
        await connect(process.env.MONGODB_URL, options)
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
        await disconnect()
        throw new Error("Error connecting to database")
    }
}