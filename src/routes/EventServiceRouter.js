const express = require('express');
const editEvent = require('../app/event_service/EditEvent');
const { getEventRole, getEventRoleFromPath } = require('../app/event_service/GetEventRole');
const startEvent = require('../app/event_service/StartEvent');

const router  = express.Router();

router.get("/get_event_role/:eventId", async(req,res)=>{
    const eventId = req.params.eventId
    const participant = await getEventRole(eventId,req.user)

    if(participant.error) res.status(400).send(participant)
    else res.send(participant)
})

router.post("/get_event_role/", async(req,res)=>{
    const path = req.body.path
    const participant = await getEventRoleFromPath(path,req.user)

    if(participant.error) res.status(400).send(participant)
    else res.send(participant)
})

router.post("/edit_event/", async(req,res)=>{
    const updatedEvent = await editEvent(req,req.user)
    
    if(updatedEvent.error) res.status(400).send(updatedEvent)
    else res.send(updatedEvent)
})

router.get("/start_event/:event_id", async(req,res) => {
    const eventId = req.params.event_id
    const updates = await startEvent(eventId,req.user)

    if(updates.error) res.status(400).send(updates)
    else res.send(updates)
})

module.exports = router;