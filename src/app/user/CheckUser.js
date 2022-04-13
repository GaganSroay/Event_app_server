const getUser = require("./GetUser");

const checkUser = async (userId) => {
  const user = await getUser(userId);
  if (user.error) return user;

  const userData = user.data();

  if (!userData) return { found: false };
  const found =
    userData.name && userData.phone && userData.email && userData.birth;
  return { found };
};

module.exports = checkUser;
