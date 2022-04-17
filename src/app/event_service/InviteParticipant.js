const admin = require("../../presistence/FirebaseAdmin");
const { getEventFromId } = require("../event/GetEvent");
const firestore = admin.firestore();
const eventRef = firestore.collection("events");
const userRef = firestore.collection("users");

const inviteParticipant = async (req, authContext) => {
  const reqData = req.body;
  if (!reqData) return { error: "Data must be provided" };

  const eventId = reqData.event_id;
  const invitedBy = authContext.user_id;
  const role = "p";
  if (!eventId) return { error: "Event Id must be provided" };
  if (reqData.role) role = reqData.role;

  const eventDoc = await getEventFromId(eventId);
  if (eventDoc.error) return eventDoc;

  const numbers = JSON.parse(reqData.numbers);
  if (!numbers) return { error: "number's array ust be provided" };
  if (!Array.isArray(numbers)) return { error: "number's list is not array" };
  if (numbers.length == 0) return { error: "no number provided" };

  const usersDocsList = [];
  for (let i = 0; i < numbers.length; i++)
    usersDocsList[i] = await userRef.where("phone", "==", numbers[i]).get();

  const invitations = [];
  for (let i = 0; i < numbers.length; i++) {

    if (!usersDocsList[i]) {
      invitations.push({found:false})
      continue;
    }

    if (!usersDocsList[i].docs[0]) {
      invitations.push({found:false})
      continue;
    }

    const userDoc = usersDocsList[i].docs[0];
    const user = userDoc.data();

    const invitation = {
      event_id: eventId,
      invited_by: invitedBy,
      role,
      phone: user.phone,
    };

    await userDoc.ref
      .collection("invitations")
      .add(invitation);

    await eventRef
      .doc(eventDoc.id)
      .collection("invitations")
      .add(invitation);

    invitation.found = true;
    invitations.push(invitation);
  }

  return invitations;
};

module.exports = inviteParticipant;
