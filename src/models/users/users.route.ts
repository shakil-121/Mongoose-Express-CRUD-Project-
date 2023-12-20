import express from 'express'; 
import { usersController } from './users.controller';

const router=express.Router();  

//All router  

//this route create a user 
router.post('/',usersController.createUser) 

// this route retrieve a list of all users 
router.get('/',usersController.AllUserGetController) 

//this route update user information 

router.put('/:userId',usersController.UserUpdate)

export const userRouters=router;