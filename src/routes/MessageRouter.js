const express = require("express");
const sendMessageToEvent = require("../app/message/EventMessage");

const router = express.Router();

router.post("/:eventId", async(req,res)=>{
    const eventId = req.params.eventId
    const message = req.body.message
    const messageSent = await sendMessageToEvent(eventId,message,req.user)

    if(messageSent.error) res.status(400).send(messageSent)
    else res.send(messageSent)
})

module.exports = router