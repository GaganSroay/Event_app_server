const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId, getEventFromPath } = require("../event/GetEvent");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");

const getEventRole = async(eventId,authContext) => {
    const eventDoc = await getEventFromId(eventId)

    if(eventDoc.error) return eventDoc

    const participantDocs = await eventRef.doc(eventDoc.id)
                                .collection("participants")
                                .where("user","==",authContext.user_id)
                                .get();

    if(!participantDocs) return { error:"Participant not found" }
    if(!participantDocs.docs[0]) return { error:"Participant not found" }

    return participantDocs.docs[0].data();

}

const getEventRoleFromPath = async(path,authContext) => {
    const eventDoc = await getEventFromPath(path)
    if(eventDoc.error) return eventDoc

    const participantDocs = await eventRef.doc(eventDoc.id)
                                .collection("participants")
                                .where("user","==",authContext.user_id)
                                .get();

    if(!participantDocs) return { error:"Participant not found" }
    if(!participantDocs.docs[0]) return { error:"Participant not found" }

    return participantDocs.docs[0].data();

}

module.exports = { 
    getEventRole,
    getEventRoleFromPath
}