import { Request, Response } from "express";
import { userSchemaValidation } from "./users.validation";
import { userService } from "./users.service";


const createUser=async (req:Request,res:Response)=>{

    try{
        const userData=req.body.user; 

        const zodValidation=userSchemaValidation.parse(userData) 

        const result =await userService.createUserIntoDB(zodValidation); 


        res.status(200).json({
            success:true, 
            message:'User created successfully!', 
            data:result, 
        }); 
        return result; 

    }catch(err){
        res.status(500).json({
            success:false, 
            message:'User does not created', 
        });
    }
}  

const AllUserGetController=async (req:Request,res:Response)=>{
    try{
        const result=await userService.GetAlluserDataService();  
        res.status(200).json({
            "success": true,
            "message": "Users fetched successfully!",
            "data":result
        });

        return result;
    }catch(err){
        console.log(err);
    }
} 


//user Information update controller  

const UserUpdate=async (req:Request,res:Response)=>{
    const { userId } = req.params;
    const updatedUserData = req.body;

    try {
        const updatedUser = await userService.userUpdateService(userId, updatedUserData);
        res.json({
            success: true,
            message: 'User updated successfully!',
            data: updatedUser
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}


export const usersController={
    createUser,
    AllUserGetController,
    UserUpdate
}