const admin = require("./initFirebase");
const firestore = admin.firestore();
const event_ref = firestore.collection("events");
const user_ref = firestore.collection("users");

const express = require("express");
const router = express.Router();

const { getUID, makeTicket } = require("./HelperFunctions");

router.post("/query", async (req, res) => {
  const event_doc = await event_ref
    .where("event_id", "==", req.body.event_id)
    .get();
  try {
    const doc_id = event_doc.docs[0].id;
    const ref = event_ref.doc(doc_id);
    const result = {
      path: ref.path,
      event_id: req.body.event_id,
      available: true,
    };
    console.log(result);
    res.send(result);
  } catch (e) {
    res.error(e);
  }
});

router.post("/join_event", async (req, res) => {
  const role = "p";
  const ticket = makeTicket();

  const event_doc = await event_ref
    .where("event_id", "==", req.body.event_id)
    .get();
  const event_id = event_doc.docs[0].data().event_id;

  const form_data = JSON.parse(req.body.form_data);
  console.log(form_data);

  user_ref
    .doc(getUID(req))
    .collection("events")
    .add({
      event_id,
      ref: event_ref.doc(event_doc.docs[0].id),
      role,
      ticket,
    });

  event_ref.doc(event_doc.docs[0].id).collection("participants").add({
    user: req.body.decodedToken.user_id,
    role,
    form_data,
    ticket,
  });
  res.send("done");
});

module.exports = router;
