const express = require("express");
const createMegaEvent = require("../app/mega_event/CreateMegaEvent");
const getMegaEvent = require("../app/mega_event/GetMegaEvent");
const sendData = require("../mapper/simpleRequestDTO");
const router = express.Router();

router.post("/create", async (req, res) => {
  const megaEventData = await createMegaEvent(req, req.user);
  res.send(megaEventData);
});

router.get("/get_mega_event/:megaEventId", async (req, res) => {
  const megaEventId = req.params.megaEventId;
  const megaEventData = await getMegaEvent(megaEventId);

  if(megaEventData.error) res.status(400).send(megaEventData)
  else res.send(megaEventData.data());
});

module.exports = router;
