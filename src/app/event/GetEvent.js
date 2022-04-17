const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const eventRef = admin.firestore().collection("events");
const userRef = admin.firestore().collection("users");

const getJoinedEvent = async (authContext) => await getEvent("p", authContext);
const getOragnisedEvent = async (authContext) =>
  await getEvent("a", authContext);

const getEvent = async (query, authContext) => {
  const eventsSnapshot = await userRef
    .doc(authContext.user_id)
    .collection("events")
    .where("role", "==", query)
    .get();

  const list = [];
  const refs = [];
  for (let doc of eventsSnapshot.docs) {
    const refToEvent = doc.data().ref;
    refs.push(refToEvent.get());
    list.push({
      docId: doc.id,
      data: doc.data(),
    });
  }
  const eventDataList = await Promise.all(refs);
  return list.map((data, index) => {
    data.eventData = eventDataList[index].data();
    data.data.refString = data.data.ref.path;
    return data;
  });
};

const getEventFromId = async (eventId) => {
  const eventDocs = await eventRef.where("event_id", "==", eventId).get();
  if (!eventDocs) return { error: "event not found" };
  if (!eventDocs.docs[0]) return { error: "event not found" };
  return eventDocs.docs[0];
};

const getEventFromPath = async (path) => {
  if (!path) return { error: "Path must be provided" };
  const event = await firestore.doc(path).get();
  if (!event) return { error: "Event not found" };
  return event;
};

module.exports = {
  getJoinedEvent,
  getOragnisedEvent,
  getEventFromId,
  getEventFromPath,
};
