const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const getTicket = async (path, authContext) => {
  const eventDoc = await firestore.doc(path).get();
  if (!eventDoc) return { error: "event not found" };
  const participantDoc = await eventRef
    .doc(eventDoc.id)
    .collection("participants")
    .where("user", "==", authContext.user_id)
    .get();

  if (!participantDoc) return { error: "participant not found" };
  if (!participantDoc.docs[0]) return { error: "participant not found" };

  const participant = participantDoc.docs[0].data();
  return participant;
};

module.exports = getTicket;
