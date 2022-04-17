const express = require("express");
const addBodyElement = require("../app/event/AddBodyElement");
const createEvent = require("../app/event/CreateEvent");
const {
  getJoinedEvent,
  getOragnisedEvent,
  getEventFromPath,
} = require("../app/event/GetEvent");
const getEventBody = require("../app/event/GetEventBody");
const getEventId = require("../app/event/GetEventId");
const joinEvent = require("../app/event/JoinEvent");
const queryEvent = require("../app/event/QueryEvent");
const getTicket = require("../app/ticket/GetTicket");
const sendData = require("../mapper/simpleRequestDTO");
const router = express.Router();

router.get("/joined", async (req, res) => {
  const list = await getJoinedEvent(req.user);
  res.send(list);
});

router.get("/organised", async (req, res) => {
  const list = await getOragnisedEvent(req.user);
  res.send(list);
});

router.post("/create_event", async (req, res) => {
  const userEventListElement = await createEvent(req, req.user);
  res.send(userEventListElement);
});

router.get("/query/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const queryRes = await queryEvent(eventId);
  sendData(queryRes, res);
});

router.post("/join_event/:eventId", async (req, res) => {
  console.log("Here joining event " + req.params);
  const eventRefForUser = await joinEvent(req, req.user);
  res.send(eventRefForUser);
});

router.post("/get_ticket/", async (req, res) => {
  const path = req.body.path;
  const participant = await getTicket(path, req.user);
  sendData(participant, res);
});

router.post("/get_event_id/", async (req, res) => {
  const path = req.body.path;
  const eventId = await getEventId(path);
  sendData(eventId, res);
});

router.post("/get_event/", async (req, res) => {
  const path = req.body.path;
  const event = await getEventFromPath(path);

  if (event.error) res.statusCode(400).send(event);
  else res.send(event.data());
});

router.get("/get_body/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const eventBody = await getEventBody(eventId, req.user);
  sendData(eventBody, res);
});

router.post("/add_body_element", async (req, res) => {
  const update = await addBodyElement(req, req.user);
  console.log(update);
  sendData(update, res);
});

module.exports = router;
