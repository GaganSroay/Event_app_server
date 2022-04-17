const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");
const userRef = firestore.collection("users");

const { makeTicket } = require("../../utils/HelperFunctions");
const { getEventFromId } = require("./GetEvent");

const joinEvent = async (req, authContext) => {
  const body = req.body;
  const ticket = makeTicket();
  const eventId = body.event_id;
  const form_data = body.form_data;

  const eventDoc = await getEventFromId(eventId);
  if (eventDoc.error) return { error: "event not found" };
  const eventData = eventDoc.data();

  if (eventData.form.required)
    if (!body.form_data) return { error: "please send form data" };

  const participant = {
    event_id: eventId,
    ref: eventRef.doc(eventDoc.id),
    role: "p",
  };
  const eventParticipant = {
    user: authContext.user_id,
    role: "p",
  };

  if (eventData.ticket_required) {
    participant.ticket = ticket;
    eventParticipant.ticket = ticket;
  }
  if (eventData.form.required) eventParticipant.form_data = form_data;

  await userRef.doc(authContext.user_id).collection("events").add(participant);
  await eventRef
    .doc(eventDoc.id)
    .collection("participants")
    .add(eventParticipant);

  return eventParticipant;
};

module.exports = joinEvent;
