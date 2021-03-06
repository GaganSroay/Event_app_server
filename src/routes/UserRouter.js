const express = require("express");
const checkUser = require("../app/user/CheckUser");
const createUser = require("../app/user/CreateUser");
const getUser = require("../app/user/GetUser");
const sendData = require("../mapper/simpleRequestDTO");
const {
  verifyTokken,
  verifyFirebaseTokken,
} = require("../middleware/Authentication");

const router = express.Router();

router.post("/get_user", verifyFirebaseTokken, async (req, res) => {
  const userId = req.body.user_id;
  const userDoc = await getUser(userId);

  if (userDoc.error) res.status(400).send(userDoc);
  else res.send(userDoc.data());
});

router.post("/create_user", verifyFirebaseTokken, async (req, res) => {
  const user = await createUser(req, req.user);
  sendData(user, res);
});

router.get("/check/:userId", async (req, res) => {
  const userId = req.params.userId;
  const found = await checkUser(userId);
  sendData(found, res);
});

router.get("/verify_id_token", async (req, res) => {
  const token = req.headers.token;
  const decodedToken = await verifyTokken(token);
  const result = {};
  if (decodedToken.error) {
    result.verified = false;
    result.error = decodedToken.error.code.toString();
  } else {
    result.verified = true;
    result.token = decodedToken;
  }
  res.send(result);
});

module.exports = router;
