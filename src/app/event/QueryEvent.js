const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const queryEvent = async (eventId) => {
  const eventDocList = await eventRef.where("event_id", "==", eventId).get();
  try {
    if (!eventDocList) return { available: false };
    if (!eventDocList.docs[0]) return { available: false };
    const eventDoc = eventDocList.docs[0];
    const doc_id = eventDoc.id;
    const ref = eventRef.doc(doc_id);
    const result = {
      path: ref.path,
      event_id: eventId,
      available: true,
      has_form: eventDoc.data().form.required,
    };
    return result;
  } catch (error) {
    return { error };
  }
};

module.exports = queryEvent;
