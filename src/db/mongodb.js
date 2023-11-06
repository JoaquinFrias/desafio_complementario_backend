import mongoose from "mongoose";

export const initdb = async () => {
    try {
        const URI = 'mongodb+srv://joakofrias:4SeYIhY3Afaz7XfR@cluster0.uec5hte.mongodb.net/ecommerce';
        await mongoose.connect(URI);

        console.log('Database connected 🗄️');
    } catch (error) {
        console.error('Database connection error', error.message);
    }
};