import mongoose from "mongoose";

export default async function connectToDB() {

  const modulename = "DBUTILS # ";

  if(mongoose.connection.readyState) {
    console.log(`${modulename} Using existing connection : ${mongoose.connection.name}`);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(`${modulename}Connected to : ${mongoose.connection.name}`);
  }
  catch(err) {
    throw new Error(`${modulename}Connection failure on : ${mongoose.connection.name}`);
  }
}
