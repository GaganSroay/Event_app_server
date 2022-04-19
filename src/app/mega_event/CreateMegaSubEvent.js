const admin = require("../../presistence/FirebaseAdmin");
const { makeid } = require("../../utils/HelperFunctions");
const getMegaEvent = require("./GetMegaEvent");
const firestore = admin.firestore();
const megaEventRef = firestore.collection("mega_events");
const userRef = firestore.collection("users");

const createMegaSubEvent = async (req, authContext) => {
    const data = req.body;
    const megaEventId = body.mega_event_id;
    const event_id = makeid();
    const role = "o";
    const ticketRequired = data.ticket_required == "true";
  
    const event_data = {
      event_name: data.event_name,
      event_date: data.event_date,
      event_description: data.description,
      event_time: data.event_time,
      ticket_required: ticketRequired,
      status: "upcomming",
      event_id,
    };
  
    const form = { required: data.has_form === "true" };
    if (form.required) form.form_data = JSON.parse(data.form_data);
    event_data.form = form;
  
    const participant = {
      user: authContext.user_id,
      role,
    };

    const megaEventDoc = await getMegaEvent(megaEventId)
    if(megaEventDoc.error) return megaEventDoc
  
    const subEvent = await megaEventRef.doc(megaEventDoc.id).collection("events").add(event_data)
    await subEvent.collection("participants").add(participant);

    const userEventListElement = {
      event_id,
      ref: subEvent.path,
      role,
    };
  
    userRef
      .doc(authContext.user_id)
      .collection("mega_sub_events")
      .add(userEventListElement);
  
    return userEventListElement;
  };