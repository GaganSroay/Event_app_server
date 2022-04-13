const admin = require("../../presistence/FirebaseAdmin");
const getUser = require("./GetUser");
const userRef = admin.firestore().collection("users");

const checkUser = async (userId) => {
  const user = await getUser(userId);
  if (user.error) return user;

  const userData = user.data();

  if (userData.name && userData.phone && userData.email && userData.birth)
    return { found: true };

  return { found: false };
};

module.exports = checkUser;
