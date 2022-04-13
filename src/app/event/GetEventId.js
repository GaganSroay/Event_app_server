const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();

const getEventId = async (path) => {
  if (!path) return { error: "please provide path" };

  const eventDoc = await firestore.doc(path).get();
  if (!eventDoc) return { error: "event not found" };

  return {
    event_id: eventDoc.data().event_id,
  };
};

module.exports = getEventId;
