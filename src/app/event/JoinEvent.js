const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");
const userRef = firestore.collection("users");

const {makeTicket} = require('../../utils/HelperFunctions')

const joinEvent = async (req, authContext) => {
    const role = "p";
    const ticket = makeTicket();
    const event_id = req.params.eventId
  
    const eventDocQuery = await eventRef.where("event_id", "==", event_id).get();
  
    if(!eventDocQuery) return {error: "not found"}
    if(!eventDocQuery.docs[0]) return {error: "not found"}

    const eventDoc = eventDocQuery.docs[0]
    const participant = {
        event_id,
        ref: eventRef.doc(eventDoc.id),
        role
    }
    const eventRefForUser = {
        user: authContext.user_id,
        role
    }

    const eventData = eventDoc.data();

    if(eventData.ticket_required) {
        participant.ticket = ticket;
        eventRefForUser.ticket = ticket;
    }
    if(eventData.form.required)
        eventRefForUser.form_data = form_data

    console.log(eventData)

    const dbTasks = [];
    dbTasks.push(userRef.doc(authContext.user_id).collection("events").add(participant));
    dbTasks.push(eventRef.doc(eventDoc.id).collection("participants").add(eventRefForUser));

    await Promise.all(dbTasks)

    return eventRefForUser
  };

module.exports = joinEvent