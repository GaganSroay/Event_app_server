const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");
const userRef = firestore.collection("users");

const { makeid } = require("../../utils/HelperFunctions");

const createEvent = async (req, authContext) => {
  const data = req.body;
  const event_id = makeid();
  const role = "a";
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

  const createdEvent = await eventRef.add(event_data);
  eventRef.doc(createdEvent.id).collection("participants").add(participant);

  const userEventListElement = {
    event_id,
    ref: eventRef.doc(createdEvent.id),
    role,
  };

  userRef
    .doc(authContext.user_id)
    .collection("events")
    .add(userEventListElement);

  return userEventListElement;
};

module.exports = createEvent;
