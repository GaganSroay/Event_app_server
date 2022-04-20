const admin = require("../../presistence/FirebaseAdmin");
const { makeid } = require("../../utils/HelperFunctions");
const getMegaEvent = require("./GetMegaEvent");
const firestore = admin.firestore();
const megaEventRef = firestore.collection("mega_events");
const userRef = firestore.collection("users");

const getSubEventfromId = async (megaEventId, eventId) => {
  const megaEventDoc = await getMegaEvent(megaEventId);
  if (megaEventDoc.error) return megaEventDoc;

  const subEventsList = await megaEventRef
    .doc(megaEventDoc.id)
    .collection("events")
    .where("event_id", "==", eventId)
    .get();

  if (!subEventsList) return { error: "no sub event found" };
  if (!subEventsList.docs) return { error: "no sub event found" };

  return subEventsList.docs[0];
};

module.exports = getSubEventfromId;
