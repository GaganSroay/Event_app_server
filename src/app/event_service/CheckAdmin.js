const admin = require("../../presistence/FirebaseAdmin");
const { getEventRole } = require("./GetEventRole");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const checkAdmin = async (eventId, authContext) => {
  const participant = await getEventRole(eventId, authContext);
  if (participant.error) return participant;
  if (participant.role == "a") return { admin: true };
  return { admin: false };
};

module.exports = checkAdmin;
