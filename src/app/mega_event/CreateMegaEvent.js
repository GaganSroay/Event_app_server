const admin = require("../../presistence/FirebaseAdmin");
const { makeid } = require("../../utils/HelperFunctions");
const firestore = admin.firestore();
const megaEventRef = firestore.collection("mega_events");
const userRef = firestore.collection("users");

const createMegaEvent = async (req, authContext) => {
  const body = req.body;
  const mega_event_id = makeid();

  const event_name = body.event_name;
  const event_date_from = body.event_date_from;
  const event_date_to = body.event_date_to;
  const event_description = body.event_description;

  if (
    (!!event_name &&
      !!event_date_from &&
      !!event_date_to &&
      !!event_description) === false
  )
    return { error: "please provide all data" };

  const megaEventData = {
    mega_event_id,
    event_name,
    event_date_from,
    event_date_to,
    event_description,
  };

  const megaEventUpdate = await megaEventRef.add(megaEventData);

  const ownerData = {
    user: authContext.user_id,
    role: "o",
  };

  const userMegaEventData = {
    ref: megaEventRef.doc(megaEventUpdate.id),
    event_id: mega_event_id,
    role: "o",
    type: "mega_event",
  };

  await megaEventUpdate.collection("admins").add(ownerData);
  await userRef
    .doc(authContext.user_id)
    .collection("events")
    .add(userMegaEventData);

  return megaEventData;
};

module.exports = createMegaEvent;
