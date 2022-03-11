const admin = require('./initFirebase')
const firestore = admin.firestore();
const event_ref = firestore.collection('events');
const user_ref = firestore.collection('users');

const express = require('express')
const router = express.Router()

const {getUID,makeid} = require('./HelperFunctions')

router.post('/create_event', async(req, res) => {
    const form_data = JSON.parse(req.body.form_data)
    const data = req.body
    const event_id = makeid();
    const role = 'a'

    const event_data = {
        event_name:data.event_name,
        event_date:data.event_date,
        event_description:data.description,
        event_time:data.event_time,
        status:'upcomming',
        event_id,
        form:{
            required:true,
            form_data
        }
    }

    const r1 = await event_ref.add(event_data)
    event_ref.doc(r1.id).collection("participants").add({
        user:req.body.decodedToken.user_id,
        role
    })

    user_ref.doc(getUID(req)).collection("events").add({ 
        event_id,
        ref:event_ref.doc(r1.id),
        role
     })

    res.send("Done")
})

module.exports = router;