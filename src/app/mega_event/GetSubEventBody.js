const admin = require("../../presistence/FirebaseAdmin");
const { makeid } = require("../../utils/HelperFunctions");
const getMegaEvent = require("./GetMegaEvent");
const getSubEventfromId = require("./GetSubEvent");
const firestore = admin.firestore();
const megaEventRef = firestore.collection("mega_events");
const userRef = firestore.collection("users");

const getSubEventBody = async (megaEventId, eventId) => {
  const subEventDoc = await getSubEventfromId(megaEventId, eventId);
  if (subEventDoc.error) return subEventDoc;

  const subEventData = subEventDoc.data();
  if (!subEventData) return { error: "event data not found" };

  const bodyData = {
    description: subEventData.event_description,
  };

  const docRef = subEventDoc.ref;

  console.log(docRef);
  console.log(docRef.path);

  /*
    const bodyList = await eventRef.doc(eventDoc.id).collection("body").get();

    if (!bodyList) return bodyData;
    if (bodyList.docs.length == 0) return bodyData;

    bodyData.body = [];
    bodyList.docs.map((doc) => {
        const bodyElementData = doc.data();
        bodyElementData.doc_id = doc.id;
        bodyData.body.push(bodyElementData);
    });*/

  return null;
};

module.exports = getSubEventBody;
