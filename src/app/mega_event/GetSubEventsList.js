const admin = require("../../presistence/FirebaseAdmin");
const getMegaEvent = require("./GetMegaEvent");
const firestore = admin.firestore();
const megaEventRef = firestore.collection("mega_events");

const getSubEventsList = async (eventId) => {
  const megaEventDoc = await getMegaEvent(eventId);
  if (megaEventDoc.error) return megaEventDoc;

  const subEventsList = await megaEventRef
    .doc(megaEventDoc.id)
    .collection("events")
    .get();

  if (!subEventsList) return { error: "no sub event found" };
  if (!subEventsList.docs) return { error: "no sub event found" };
  if (subEventsList.docs.length == 0) return { error: "no sub event found" };

  const list = [];

  for (let doc of subEventsList.docs) {
    const listElement = {
      eventData: doc.data(),
      data: {
        refString: doc.ref.path,
      },
    };
    list.push(listElement);
  }
  return list;
};

module.exports = getSubEventsList;
