import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", true);

const db: { connect: () => Promise<void> } = {
  connect: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(process.env.MONGODB_SRV as string);
        resolve();
      } catch (e) {
        console.error(e);
        reject();
      }
    });
  },
};

export default db;
