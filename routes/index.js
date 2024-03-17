const { createRoom, getAllRooms } = require("../controller/rooms");

const router = require("express").Router();

router.post("/create-room", createRoom);
router.get("/get-rooms", getAllRooms);
module.exports = router;
