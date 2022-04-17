const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("../event/GetEvent");
const firestore = admin.firestore();
const eventRef = admin.firestore().collection("events");
const userRef = admin.firestore().collection("users");

const getInvitations = async (authContext) => {
  const userId = authContext.user_id;
  const invitationDocList = await userRef
    .doc(userId)
    .collection("invitations")
    .get();

  if (!invitationDocList) return { error: "no invited event list found" };
  if (!invitationDocList.docs) return { error: "no invited event found" };

  const invitationsList = [];

  for (let doc of invitationDocList.docs) {
    const invitation = doc.data();
    const eventDoc = await getEventFromId(invitation.event_id);
    const invitedByUserDoc = await userRef.doc(invitation.invited_by).get();

    if (!eventDoc) {
      console.log(`event ${invitation.event_id} doesnt exist`);
      continue;
    }
    if (eventDoc.error) {
      console.log(`event ${invitation.event_id} doesnt exist`);
      continue;
    }

    if (!eventDoc) {
      console.log(`event ${invitation.event_id} doesnt exist`);
      continue;
    }

    invitation.ref = eventRef.doc(eventDoc.id).path;
    invitation.event_data = eventDoc.data();
    invitation.invited_by_name = invitedByUserDoc.data().name;

    invitationsList.push(invitation);
  }

  return { list: invitationsList };
};

module.exports = getInvitations;
