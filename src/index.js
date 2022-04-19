const express = require("express")();
const PORT = 3000;

const bodyParser = require("body-parser");
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

const { verifyFirebaseTokken } = require("./middleware/Authentication");
const eventsRouter = require("./routes/EventRouter");
const messageRouter = require("./routes/MessageRouter");
const eventServiceRouter = require("./routes/EventServiceRouter");
const userRouter = require("./routes/UserRouter");
const megaEventRouter = require("./routes/MegaEventRoutes");
const initStartEventTriggers = require("./presistence/StartEventTrigger");

express.use("/user", userRouter);
express.use(verifyFirebaseTokken);
express.use("/events", eventsRouter);
express.use("/mega_event", megaEventRouter);
express.use("/events_service", eventServiceRouter);
express.use("/message", messageRouter);

initStartEventTriggers();

express.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
