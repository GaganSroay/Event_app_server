const getMegaEventRole = require("./GetMegaEventRole");

const checkAdmin = async (eventId, authContext) => {
  const admin = await getMegaEventRole(eventId, authContext);

  if (admin.error) return admin;
  if (admin.role == "o") return true;

  return false;
};

module.exports = checkAdmin;
