const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("../event/GetEvent");
const firestore = admin.firestore();
const eventRef = admin.firestore().collection("events");
const userRef = admin.firestore().collection("users");

const getPaticularInvitation = async (eventId, authContext) => {
  const eventDoc = await getEventFromId(eventId);
  const eventInvitationDoc = await eventRef
    .doc(eventDoc.id)
    .collection("invitations")
    .where("user", "==", authContext.user_id)
    .get();

  if (!eventInvitationDoc) return { error: "invitation not found" };
  if (!eventInvitationDoc.docs[0]) return { error: "invitation not found" };

  const userInvitationDoc = await userRef
    .doc(authContext.user_id)
    .collection("invitations")
    .where("event_id", "==", eventId)
    .get();

  if (!userInvitationDoc) return { error: "invitation not found" };
  if (!userInvitationDoc.docs[0]) return { error: "invitation not found" };

  const eventInvitation = eventInvitationDoc.docs[0];
  const userInvitation = userInvitationDoc.docs[0];

  return {
    eventInvitation,
    userInvitation,
  };
};

module.exports = getPaticularInvitation;
