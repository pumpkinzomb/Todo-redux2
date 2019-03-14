// const TodoList = require('../model/todolist');
const User = require('../model/user');
const mongoose = require('mongoose');


module.exports = (router) =>{
    /* 
        //////////////////////////////////
        /////////// USER START ///////////
        //////////////////////////////////
    */
    router.post('/user/signup',(req,res)=>{
       
        let userIdRegex = /^[a-z0-9]+$/;

        // CHECK USERNAME FORMAT
        if(!userIdRegex.test(req.body.userId)){
            return res.status(400).json({
                error: "BAD USERNAME",
                code: 1
            });
        }
        // CHECK PASS LENGTH
        if(req.body.password.length < 4 || typeof req.body.password !== "string"){
            return res.status(400).json({
                error: "BAD PASSWORD",
                code: 2
            });
        }
        // CHECK USER EXISTANCE

        
        User.findOne({userId: req.body.userId}, (err,exists)=>{
            if(err) throw err;
            if(exists){
                return res.status(409).json({ //status 409는 충돌, 보통 중복되는 아이디값이 있을경우 사용된다.
                    error: "USERNAME EXISTS",
                    code: 3
                })
            }

            // CREATE ACCOUNT
            let user = new User({
                userId: req.body.userId,
                password: req.body.password
            });

            user.password = user.generateHash(user.password);

            // SAVE IN THE DATABASE
            user.save(err=>{
                if(err) throw err;
                return res.json({ success: true })
            });
        });
    });
    router.post('/user/signin',(req,res)=>{
        if(typeof req.body.password !== "string"){
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            })
        }
    
        // FIND THE USER BY USERNAME
        User.findOne({ userId: req.body.userId }, (err, _user) => {
            if(err) throw err;
    
            // CHECK ACCOUNT EXISTANCY
            if(!_user){
                return res.status(401).json({ //401은 권한없음을 의미한다.
                    error: "LOGIN FAILED",
                    code: 1
                });
            }
            // CHECK WHETHER THE PASSWORD IS VALID
            if(!_user.validateHash(req.body.password)){
                return res.status(401).json({
                    error: "LOGIN FAILED",
                    code: 2
                });
            }

            let user = {
                _id : _user._id,
                userId: _user.userId
            }
            let todolists= _user.todolists;
            return res.json({
                sucess: true,
                user,
                todolists
            });
        });
    })
    /* 
        USER END
    */
    /* 
        //////////////////////////////////////
        /////////// TODOLIST START ///////////
        //////////////////////////////////////
    */
    router.get('/lists',(req,res)=>{
        return res.json([]);
    });
    router.put('/lists/:id',(req,res)=>{
        // CHECK MEMO ID VALIDITY
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                error: "INVALID ID",
                code: 1
            });
        }
        // CHECK CONTENTS VALID
        if(typeof req.body.todolists !== 'object' || req.body.todolists === ''){
            return res.status(400).json({
                error: "EMPTY CONTENTS",
                code: 2
            });
        }
        
        // FIND LISTS
        User.findById(req.params.id, (err,user)=>{
            if(err) throw err;
    
            // IF MEMO DOES NOT EXIST
            if(!user){
                return res.status(404).json({
                    error: "NO RESOURCE",
                    code: 3
                });
            }
            // MODIFY AND SAVE IN DATABASE
            user.todolists = req.body.todolists;
            user.save((err,_user)=>{
                if(err) throw err;
                let todolists = _user.todolists
                return res.json({
                    success: true,
                    todolists
                });
            });
       });
    });
    
    /* 
        TODOLIST END
    */
}