import mongoose from "mongoose"


export const connectMongoDatabase = () => {
    mongoose.connect(process.env.DB_URL)
        .then((data) => {
            console.log(`mongodb connected with server ${data.connection.host}`);
        })
}


