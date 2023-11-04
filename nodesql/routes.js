const express = require('express');
const rou = express.Router()
const jwt = require('jsonwebtoken')

const login = require('./functions/login')
const signup = require('./functions/signup')
const allUsers = require('./functions/Users')
const updateUser = require('./functions/Update')
const resetPassword = require('./functions/resetPassword')


const tokenverify = (req, res, next) => {
    console.log('reqqqqq',req, req.headers.token)
    let token = req.headers["token"]
    jwt.verify(token, process.env.skey, (err, user) => {
        if (err) {
            return res.status(403).send({ status: false, data: "InValid Token" })
        }
        console.log("user...........:)", user)
        req.query.userId = user._id
        next()
    })
}

rou.get('/', (req, res) => {
    res.send("Hello World");
});


rou.post('/signup', async (req, res) => {
    try {
        const data = await signup.main(req);
        res.status(data.statusCode).send(data.body)
    } catch (e) {
        console.log("e................:)", e);
        res.status(500).send("Internal Server Error")
    }
})


rou.get('/login', async(req, res)=>{
    try{
        const data = await login.main(req);
        res.status(data.statusCode).send(data.body)
    }catch(e){
        console.log("e................:)", e);
        res.status(500).send("Internal Server Error")
    }
})

rou.get('/currentUser',tokenverify, async(req, res)=>{
    try{
        const data = await allUsers.main(req);
        res.status(data.statusCode).send(data.body)
    }catch(e){
        console.log("e................:)", e);
        res.status(500).send("Internal Server Error")
    }
})


rou.put('/user',tokenverify, async(req, res)=>{
    try{
        const data = await updateUser.main(req);
        res.status(data.statusCode).send(data.body)
    }catch(e){
        console.log("e................:)", e);
        res.status(500).send("Internal Server Error")
    }
})

rou.put('/password',tokenverify, async(req, res)=>{
    try{
        console.log('kkkkkkkkkkk')
        const data = await resetPassword.main(req);
        res.status(data.statusCode).send(data.body)
    }catch(e){
        console.log("e................:)", e);
        res.status(500).send("Internal Server Error")
    }
})


module.exports = rou