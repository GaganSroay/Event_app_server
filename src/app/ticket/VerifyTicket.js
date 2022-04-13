const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("../event/GetEvent");
const { getEventRole } = require("../event_service/GetEventRole");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const verifyTicket = async (req, authContext) => {
  const eventId = req.body.event_id;
  const ticket = req.body.ticket;

  if (!eventId) return { error: "eventId must be provided" };
  if (!ticket) return { error: "ticket must be provided" };

  const user = await getEventRole(eventId, authContext);
  if (!user) return { error: "user not found" };
  if (user.role != "a") return { error: "You dont have permissions" };

  const eventDoc = await getEventFromId(eventId);

  const participantQueryRes = await eventRef
    .doc(eventDoc.id)
    .collection("participants")
    .where("ticket", "==", ticket)
    .get();

  if (!participantQueryRes) return { error: "ticket invalid" };
  const participantDoc = participantQueryRes.docs[0];
  if (!participantDoc) return { error: "ticket invalid" };
  const participantData = participantDoc.data();
  if (!participantData) return { error: "ticket invalid" };

  const update = await participantDoc.ref.update({ participated: true });
  return update;
};

module.exports = verifyTicket;
