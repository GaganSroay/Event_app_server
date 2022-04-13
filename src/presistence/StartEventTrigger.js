const admin = require("./FirebaseAdmin");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const schedule = require("node-schedule");
const { eventStartCallback } = require("../app/event_service/StartEvent");

const scheduleStartEvent = (date, eventId) => {
  schedule.scheduleJob(
    date,
    function (eventId) {
      eventStartCallback(eventId);
    }.bind(null, eventId)
  );
};

const initStartEventTriggers = async () => {
  const eventList = await eventRef.get();
  eventList.docs.map((doc) => {
    const event = doc.data();
    const eventDate = event.event_date;
    const eventTime = event.event_time;
    const eventDateandTime = eventDate + eventTime;

    const eventId = event.event_id;
    const date = new Date(eventDateandTime);

    scheduleStartEvent(date, eventId);
  });
};

module.exports = initStartEventTriggers;
