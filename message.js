const admin = require('./initFirebase')
const firestore = admin.firestore();
const event_ref = firestore.collection('events');
const user_ref = firestore.collection('users');

const express = require('express')
const router = express.Router()


express.router('/message',(req,res)=>{
    const topic = 'topic';
    const message = {
        message : req.body.message,
        user : req.body.decodedToken.user_id,
        messageId : getRandomString(6),
        timestamp : Date.now(),
        notification: {
            title: 'Message Title',
            body: 'Message Body'
          },
        topic: topic
    }
    
    firestore.doc(req.body.event_id).collection("messages").add(message);
    admin.messaging().send(message)

    res.send("done")

})

router.post('/invite', (req,res) =>{
    const numbers = req.body.numbers
    for(let i=0;i<numbers.count;i++){
        user_ref.doc(numbers[i]).collection("invitations").add({
            event_id : req.body.event_id
        })
    }
})

module.exports = router