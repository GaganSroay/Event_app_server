const express = require('express');
const getUser = require('../app/user/GetUser');
const { verifyTokken, verifyFirebaseTokken } = require('../middleware/Authentication');

const router = express.Router();

router.post("/get_user",verifyFirebaseTokken,async(req,res)=>{
    const userId = req.body.user_id
    const userDoc = await getUser(userId)

    if(userDoc.error) res.status(400).send(userDoc)
    else res.send(userDoc.data())
})

router.get("/verify_id_token", async(req,res) => {
    const token = req.headers.token;
    const decodedToken = await verifyTokken(token)
    res.send(decodedToken)
})

module.exports = router