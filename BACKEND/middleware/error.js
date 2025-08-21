import HandleError from "../utils/handleError.js";


export default (error , req, res ,next )=>{
    error.statusCode = error.statusCode || 500;
    error.message=error.message || "Internal Server Error";

    //castError
    if(error.name === 'CastError'){
        const message = `This is invalid resource ${error.path}`;
        error=new HandleError(message,404)
    }


    //DUPLICATE KEY ERROR
    if(error.code === 1100){
        const message = ` this  ${Object.keys(error.keyValue)} already registered . please login to continue `
        error = new HandleError(message,400)
    }   
    res.status(error.statusCode).json({
        succcess:false,
        message:error.message
        // message:error.stack
    })
}