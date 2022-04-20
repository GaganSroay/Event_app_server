const express = require("express");
const createMegaEvent = require("../app/mega_event/CreateMegaEvent");
const createMegaSubEvent = require("../app/mega_event/CreateMegaSubEvent");
const getMegaEvent = require("../app/mega_event/GetMegaEvent");
const getSubEventBody = require("../app/mega_event/GetSubEventBody");
const getSubEventsList = require("../app/mega_event/GetSubEventsList");
const sendData = require("../mapper/simpleRequestDTO");
const router = express.Router();

router.post("/create", async (req, res) => {
  const megaEventData = await createMegaEvent(req, req.user);
  console.log(megaEventData);
  res.send(megaEventData);
});

router.get("/get_mega_event/:megaEventId", async (req, res) => {
  const megaEventId = req.params.megaEventId;
  const megaEventData = await getMegaEvent(megaEventId);

  if (megaEventData.error) res.status(400).send(megaEventData);
  else res.send(megaEventData.data());
});

router.post("/create_sub_event", async (req, res) => {
  const megaEventData = await createMegaSubEvent(req, req.user);
  console.log(megaEventData);
  res.send(megaEventData);
});

router.get("/sub_events_list/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const eventsList = await getSubEventsList(eventId);
  res.send(eventsList);
});

router.get("/get_sub_event_body/:megaEventId/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const megaEventId = req.params.megaEventId;
  const body = await getSubEventBody(megaEventId, eventId);
  res.send(eventsList);
});

router.post("/get_sub_event_body", async (req, res) => {
  const body = await getSubEventBody(megaEventId, eventId);
  res.send(eventsList);
});

module.exports = router;
