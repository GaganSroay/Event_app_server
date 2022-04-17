const express = require("express");
const editEvent = require("../app/event_service/EditEvent");
const {
  getEventRole,
  getEventRoleFromPath,
} = require("../app/event_service/GetEventRole");
const inviteParticipant = require("../app/invitation/InviteParticipant");
const leaveEvent = require("../app/event_service/LeaveEvent");
const { startEvent } = require("../app/event_service/StartEvent");
const verifyTicket = require("../app/ticket/VerifyTicket");
const sendData = require("../mapper/simpleRequestDTO");

const router = express.Router();

router.get("/get_event_role/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const participant = await getEventRole(eventId, req.user);
  sendData(participant, res);
});

router.post("/get_event_role/", async (req, res) => {
  const path = req.body.path;
  const participant = await getEventRoleFromPath(path, req.user);
  sendData(participant, res);
});

router.post("/edit_event/", async (req, res) => {
  const updatedEvent = await editEvent(req, req.user);
  sendData(updatedEvent, res);
});

router.get("/start_event/:event_id", async (req, res) => {
  const eventId = req.params.event_id;
  const updates = await startEvent(eventId, req.user);
  sendData(updates, res);
});

router.post("/verify_ticket", async (req, res) => {
  const updates = await verifyTicket(req, req.user);
  console.log(updates);
  sendData(updates, res);
});

router.post("/invite", async (req, res) => {
  const participantList = await inviteParticipant(req, req.user);
  console.log(participantList);
  sendData(participantList, res);
});

router.get("/leave/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const updates = await leaveEvent(eventId, req.user);
  console.log(updates);
  sendData(updates, res);
});

module.exports = router;
