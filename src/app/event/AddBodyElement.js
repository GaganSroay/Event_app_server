const admin = require("../../presistence/FirebaseAdmin");
const { getEventRole } = require("../event_service/GetEventRole");
const { getEventFromId } = require("./GetEvent");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");
const userRef = firestore.collection("users");

const addBodyElement = async (req, authContext) => {
  const elementData = req.body;
  if (!elementData) return { error: "element data must be provided" };
  if (!elementData.name || !elementData.data || !elementData.type)
    return { error: "please provide element data" };

  const eventId = elementData.event_id;
  if (!eventId) return { error: "eventId must be provided" };

  const user = await getEventRole(eventId, authContext);
  if (!user) return { error: "user not found" };
  if (user.error) return { error: "user not found" };

  if (user.role != "a") return { error: "you dont have permission for that" };

  const eventDoc = await getEventFromId(eventId);

  if (eventDoc.error) return eventDoc;

  const element = {
    name: elementData.name,
    data: elementData.data,
    type: elementData.type,
  };

  const updates = await eventRef
    .doc(eventDoc.id)
    .collection("body")
    .add(element);

  return updates;
};

module.exports = addBodyElement;
