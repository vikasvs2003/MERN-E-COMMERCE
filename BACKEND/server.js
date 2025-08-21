import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDatabase } from './config/db.js';

if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: 'backend/config/config.env' })
}
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';

const port = process.env.PORT || 8000;
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});



connectMongoDatabase();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})


//HANDLE UNCAUGHT EXCEPTION ERROR
process.on('uncaughtException', (err) => {
  console.log(`Error  ${err.message}`);
  console.log(`server is shutting down due to uncaught exception errors`);
  process.exit(1);
})

const server = app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});



process.on('unhandledRejection', (err) => {
  console.log(`Error ${err.message}`);
  console.log(`server is shutting down , due to un handled promise rejection`);
  server.close(() => {
    process.exit(1)
  })
})