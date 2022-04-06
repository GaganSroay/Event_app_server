const admin = require("../../presistence/FirebaseAdmin");
const firestore = admin.firestore();
const event_ref = firestore.collection("events");
const user_ref = firestore.collection("users");

const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  const token = req.body.firebase_token;
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.body.decodedToken = decodedToken;
      next();
    })
    .catch((error) => {
      console.log(error);
      res.send("Error in token verification " + error);
    });
});

router.post("/new_user", (req, res) => {
  const uid = req.body.decodedToken.user_id;
  const data = {
    name: req.body.name,
    birth: req.body.birth,
    phone: req.body.phone || "nothing",
    email: req.body.email || "nothing",
  };
  user_ref.doc(uid).set(data);
  res.send("done");
});

module.exports = router;
