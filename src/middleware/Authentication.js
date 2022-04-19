const admin = require("../presistence/FirebaseAdmin");

const verifyFirebaseTokken = async (req, res, next) => {
  //const token = req.headers.token;
  const user_id = req.headers.token;
  //if (!token) {
  // res.send({ error: "no token provided" });
  //}

  //const decodedToken = await verifyTokken(token);

  //if (!decodedToken) res.send({ error: "tokken not verified" });
  //if (decodedToken.error) res.send(decodedToken.error);

  //req.user = decodedToken;
  req.user = { user_id };
  next();
};

const verifyTokken = (token) => {
  if (!token) return { error: "no token provided" };
  return new Promise((res, rej) => {
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => res(decodedToken))
      .catch((error) => res({ error: error }));
  });
};

module.exports = {
  verifyFirebaseTokken,
  verifyTokken,
};
