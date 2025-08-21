import express from 'express';
import product from './routes/productRoutes.js'
import user from './routes/userRoutes.js'
import order from './routes/orderRoutes.js'
import payment from './routes/paymentRoutes.js'
import errorHandleMiddleware from './middleware/error.js'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)
const app = express();

// ye zaroori hai warna req.body undefined rahega
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware 
app.use(express.json());
app.use(cookieParser())
app.use(fileUpload())



app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)


//Serve Static Files
app.use(express.static(path.join(__dirname,'../FRONTEND/dist')))
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../FRONTEND/dist/index.html"));
});




app.use(errorHandleMiddleware)
if(process.env.NODE_ENV !== 'PRODUCTION'){
    dotenv.config({path:'backend/config/config.env'})
}

export default app;
