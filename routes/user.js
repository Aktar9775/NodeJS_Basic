const express=require('express');
const router=express.Router();
const {handleGetAllUsers,getUserById,updateUserById,deleteUserById,createUser}=require('../controllers/user')

//=========================================== User Data in dataBase =========== 
//  DataBase Connection MongoDB And data send


router.route("/")
//All Data Featch 
.get(handleGetAllUsers)
//Create User
.post(createUser)


//Update , Delete, And Find by ID.
router
  .route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);
  module.exports=router;