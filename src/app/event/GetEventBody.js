const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("./GetEvent");
const eventRef = admin.firestore().collection("events");

const getEventBody = async (eventId, authContext) => {
  const eventDoc = await getEventFromId(eventId);
  if (eventDoc.error) return eventDoc;

  const eventData = eventDoc.data();
  if (!eventData) return { error: "event data not found" };

  const bodyData = {
    description: eventData.event_description,
  };

  const bodyList = await eventRef.doc(eventDoc.id).collection("body").get();

  if (!bodyList) return bodyData;
  if (bodyList.docs.length == 0) return bodyData;

  bodyData.body = [];
  bodyList.docs.map((doc) => {
    const bodyElementData = doc.data();
    bodyElementData.doc_id = doc.id;
    bodyData.body.push(bodyElementData);
  });

  return bodyData;
};

module.exports = getEventBody;
