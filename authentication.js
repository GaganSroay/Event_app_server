const admin = require('./initFirebase')
const firestore = admin.firestore();
const event_ref = firestore.collection('events');
const user_ref = firestore.collection('users');

const express = require('express')
const router = express.Router()

router.use((req,res,next)=>{
    const tokken = req.body.firebase_tokken;
    admin.auth().verifyIdToken(tokken)
        .then( decodedToken => {
            req.body.decodedToken = decodedToken
            //console.log(decodedToken)
            next()
        })
        .catch( error => res("Error in tokken verification "+error));
})

router.post('/new_user',(req,res)=>{
    const uid = req.body.decodedToken.user_id;
    const data = {
        name: req.body.name,
        birth: req.body.birth,
        phone: req.body.phone || 'nothing',
        email: req.body.email || 'nothing'
    }
    user_ref.doc(uid).set(data)
    res.send("done")
})

module.exports = router