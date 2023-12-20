import { TUser } from "./users.interface";
import { UserModel } from "./users.model";



const createUserIntoDB=async (userData:TUser)=>{
    const result=await UserModel.create(userData); 

    return result;
} 

//all user data retrive 
const GetAlluserDataService=async()=>{
    const result = await UserModel.find().select({
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      });
    return result;
}

//user update service  
// const userUpdateService=async(userId:TUser["userId"],updatedUserData:TUser)=>{
    
//     const result =await UserModel.findByIdAndUpdate({userId},updatedUserData,{new:true})
//     return result;
// } 
const  userUpdateService=async (userId:string, updatedUserData:TUser)=> {
    try { 
        
        const user = await UserModel.findOneAndUpdate(userId, updatedUserData, { new: true });

        if (!user) {
            throw new Error('User not found');
        }

        // // Omit password field from the returned user data
        // eslint-disable-next-line no-unused-vars
        const { password, ...updatedUserWithoutPassword } = user.toObject();
        return updatedUserWithoutPassword;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        throw new Error(error.message);
    }
}


export const userService={
    createUserIntoDB,
    GetAlluserDataService,
    userUpdateService
}