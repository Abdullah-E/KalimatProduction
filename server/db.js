import mongoose from 'mongoose'
const mongoConnectionURL = process.env.MONGO_URL

export const mongo = await mongoose.connect(mongoConnectionURL)
console.log("mongo connected")
