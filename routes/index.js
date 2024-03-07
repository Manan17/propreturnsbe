const {
  createParkingLot,
  getByColor,
  getBySlots,
} = require("../controller/parkinglots");
const { createParking, deleteParking } = require("../controller/parkings");

const router = require("express").Router();

router.get("/Parkings?", getByColor);
router.get("Slots?", getBySlots);
router.post("/ParkingLots", createParkingLot);
router.post("/Parkings", createParking);
router.delete("/Parkings", deleteParking);
module.exports = router;
