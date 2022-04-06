const admin = require("./initFirebase");
const firestore = admin.firestore();
const event_ref = firestore.collection("events");
const user_ref = firestore.collection("users");

const express = require("express");
const router = express.Router();

const { ranChar } = require("./HelperFunctions");

router.post("/message", (req, res) => {
  console.log("here");
  const topic = "topic";
  const payload = {
    message: req.body.message,
    user: req.body.decodedToken.user_id,
    messageId: ranChar(6),
    timestamp: Date.now(),
    notification: {
      title: "Message Title",
      body: "Message Body",
    },
    topic: topic,
  };

  firestore.doc(req.body.event_id).collection("messages").add(payload);
  //admin.messaging().send(message)

  res.send("done");
});

router.post("/invite", (req, res) => {
  const numbers = req.body.numbers;
  for (let i = 0; i < numbers.count; i++) {
    user_ref.doc(numbers[i]).collection("invitations").add({
      event_id: req.body.event_id,
    });
  }
});

module.exports = router;
