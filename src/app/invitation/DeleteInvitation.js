const getPaticularInvitation = require("./GetPaticularInvitation");

const deleteInvitation = async (eventId, authContext) => {
  const invitation = await getPaticularInvitation(eventId, authContext);
  console.log(invitation);
  if (invitation.error) return invitation;

  const userUpdate = await invitation.userInvitation.ref.delete();
  const eventUpdate = await invitation.eventInvitation.ref.delete();

  return {
    userUpdate,
    eventUpdate,
  };
};

module.exports = deleteInvitation;
