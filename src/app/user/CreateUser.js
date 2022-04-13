const admin = require("../../presistence/FirebaseAdmin");
const userRef = admin.firestore().collection("users");

const createUser = async (req, userId) => {
  const data = req.body;

  if (!data) return { error: "user data must be provided" };
  if (!data.name) return { error: "user name must be provided" };
  if (!data.birth) return { error: "user birth must be provided" };
  if (!data.phone) return { error: "user phone must be provided" };
  if (!data.email) return { error: "user email must be provided" };

  const userData = {
    name: data.name,
    birth: data.birth,
    phone: data.phone,
    email: data.email,
  };

  const user = await userRef.doc(userId).set(userData);

  if (!user) return { error: "couldnt create user" };

  return user;
};

module.exports = createUser;
