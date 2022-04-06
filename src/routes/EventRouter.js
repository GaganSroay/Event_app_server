const express = require("express");
const createEvent = require("../app/event/CreateEvent");
const { getJoinedEvent, getOragnisedEvent, getEventFromPath } = require("../app/event/GetEvent");
const getEventId = require("../app/event/GetEventId");
const joinEvent = require("../app/event/JoinEvent");
const queryEvent = require("../app/event/QueryEvent");
const getTicket = require("../app/ticket/GetTicket");
const router = express.Router();

router.get("/joined", async (req, res) => {
  const list = await getJoinedEvent(req, req.user);
  res.send(list);
});

router.get("/organised", async (req, res) => {
  const list = await getOragnisedEvent(req, req.user);
  res.send(list);
});

router.post("/create_event", async (req, res) => {
  const userEventListElement = await createEvent(req, req.user);
  res.send(userEventListElement);
});

router.get("/query/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const queryRes = await queryEvent(eventId);

  if(queryRes.error) res.status(400).send(queryRes)
  else res.send(queryRes);
});

router.post("/join_event/:eventId", async (req, res) => {
  console.log("Here joining event "+ req.params)
  const eventRefForUser = await joinEvent(req, req.user);
  console.log(eventRefForUser)
  res.send(eventRefForUser);
});

router.post("/get_ticket/", async (req, res) => {
    const path = req.body.path;
    const participant = await getTicket(path,req.user)
    res.send(participant)
});

router.post("/get_event_id/", async (req, res) => {
  const path = req.body.path;
  const eventId = await getEventId(path)
  if(eventId.error) res.status(400).send(eventId)
  else res.send(eventId)
});

router.post("/get_event/", async(req,res) => {
  const path = req.body.path;
  const event = await getEventFromPath(path)

  if(event.error) res.status(400).send(event)
  else res.send(event.data())
})

module.exports = router;
