const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("../event/GetEvent");
const { getEventRole } = require("./GetEventRole");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const editEvent = async (req, authContext) => {
  const eventId = req.body.eventId;

  if (!eventId) return { error: "event_id must be provided" };

  const role = await getEventRole(eventId, authContext);

  if (!role) return role;
  if (role.error) return { error: "You dont have permissions to make changes" };
  if (role.role != "a")
    return { error: "You dont have permissions to make changes" };

  const changes = req.body;
  const editEvent = {};

  if (!changes) return { error: "No changes to make" };

  if (changes.event_name) editEvent.event_name = changes.event_name;
  if (changes.event_date) editEvent.event_date = changes.event_date;
  if (changes.event_time) editEvent.event_time = changes.event_time;

  if (changes.status) editEvent.status = changes.status;

  const eventDoc = await getEventFromId(eventId);

  const updatedEvent = await eventRef.doc(eventDoc.id).update(changes);

  if (!updatedEvent) return { error: "error updating event" };

  updatedEvent.success = true;

  return updatedEvent;
};

module.exports = editEvent;
