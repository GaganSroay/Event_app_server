const admin = require("../presistence/FirebaseAdmin");

const verifyFirebaseTokken = async (req, res, next) => {
  const token = req.headers.token;

  const decodedToken = await verifyTokken(token);

  if (!decodedToken) res.send({ error: "tokken not verified" });
  if (decodedToken.error) res.send(decodedToken.error);

  req.user = decodedToken;
  next();
};

const verifyTokken = (token) => {
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
