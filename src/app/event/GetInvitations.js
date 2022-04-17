const admin = require("../../presistence/FirebaseAdmin");
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
};
