
import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance } from "../server.js";
import crypto from 'crypto'

export const processPayment = handleAsyncError(async(req,res)=>{
    const options={
        amount:  Number(req.body.amount*100 ),
        currency:'INR'
    }

    const order = await instance.orders.create(options)
    res.status(200).json({
        success:true,
        order
    })
})     
//SEND API KEY 
export const sendAPIKey = handleAsyncError(async(req,res)=>{
     res.status(200).json({
       key:process.env.RAZORPAY_API_KEY
    })
})     



//PAYMENT VERIFICATION

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(sign.toString())
    .digest("hex");

  // console.log("Expected Signature:", expectedSignature);
  // console.log("Razorpay Signature:", razorpay_signature);

  if (expectedSignature === razorpay_signature) {
    // ✅ Signature valid
    res.status(200).json({ success: true, message: "Payment verified" ,reference : razorpay_payment_id });
  } else {
    // ❌ Signature invalid
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};