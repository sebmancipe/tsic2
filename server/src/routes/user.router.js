const express = require('express');
const userRouter = express.Router();
const User = require('../model/user.model');

/* Get all users */
//localhost:8080/users/getall
userRouter.get('/getall',(req,res,next) =>{
    User.find({},function(err,result){
        if(err){
            res.status(400).send({
                'success': false,
                'error':err.message
            });
        }
        res.status(200).send({
            'success':true,
            'data':result
        });
    });
});

/* Get one user */
//localhots:8080/users/user
userRouter.get('/user',(req,res,next) =>{
    User.findById(req.query.user_id, function (err,result){
        if(err){
            res.status(400).send({
                success: false,
                error: err.message
              });
        }
        res.status(200).send({
            success: true,
            data: result
        });
    });
});

/* Add one User */
//localhost:8080/users/add
userRouter.post("/add", (req, res, next) => {
    let newUser = {
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      password: req.body.password
    };
    User.create(newUser, function(err, result) {
      if(err){
          res.status(400).send({
            success: false,
            error: err.message
          });
      }
        res.status(201).send({
          success: true,
          data: result,
          message: "User created successfully"
        });
    });
  });

  /* Edit a User */
  //localhost:8080/users/edit?user_id:...
  //body contains data to update
userRouter.patch("/edit", (req, res, next) => {
    let fieldsToUpdate = req.body;
    User.findByIdAndUpdate(req.query.user_id,{ $set: fieldsToUpdate }, { new: true },  function (err, result) {
        if(err){
            res.status(400).send({
               success: false,
              error: err.message
              });
        }
        res.status(200).send({
          success: true,
          data: result,
          message: "User updated successfully"
          });
    });
  });
module.exports=userRouter;
