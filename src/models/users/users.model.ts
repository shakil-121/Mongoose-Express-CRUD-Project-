import { Schema, model } from 'mongoose';
import { TUser, Taddress, TfullName } from './users.interface'; 
import bcrypt from 'bcrypt'
import config from '../../app/config';

//order schema model
// const OrderSchema = new Schema<TOrder>({
//   productName: { type: String },
//   price: { type: Number },
//   quantity: { type: Number },
// });

//fullNmae Schema model
const fullNameSchema = new Schema<TfullName>({
  firstName: { type: String },
  lastName: { type: String },
});

//address schema model
const addressSchema = new Schema<Taddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

//create user schema model
const UserSchema = new Schema<TUser>({
  userId: { type: Number, unique: true,required:true},
  username: { type: String, unique: true,required:true},
  password: { type: String,required:true},
  fullName: fullNameSchema,
  age: { type: Number,required:true },
  email: { type: String,required:true },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: addressSchema,
  // orders: {
  //   type:[OrderSchema],
  //   default:[]
  // },
});  


//creating static method  
UserSchema.statics.isUserExist=async function (userId:number){
  const existingUser=await UserModel.findOne({userId}) 

  return existingUser;
}

//create a custom  middleware for password is securely stored in hashed form 
UserSchema.pre('save',async function(next){
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user=this; 

  user.password =await bcrypt.hash(user.password,Number(config.bcrypt_salt_round))
  next();
})

//create a model 
export const UserModel=model<TUser>('user',UserSchema)
