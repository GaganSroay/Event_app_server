const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const megaEventRef = firestore.collection("mega_events");
const getMegaEvent = async (eventId) => {
  if (!eventId) return { error: "PLease provide eventId" };

  const megaEventDoc = await megaEventRef
    .where("mega_event_id", "==", eventId)
    .get();
  if (!megaEventDoc) return { error: "mega event not found" };
  if (!megaEventDoc.docs[0]) return { error: "mega event not found" };

  const megaEvent = megaEventDoc.docs[0];

  return megaEvent;
};

module.exports = getMegaEvent;
