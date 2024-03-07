const { createParkingLot, getByColor } = require("../controller/parkinglots");
const { createParking, deleteParking } = require("../controller/parkings");

const router = require("express").Router();

router.post("/ParkingLots", createParkingLot);
router.post("/Parkings", createParking);
router.delete("/Parkings", deleteParking);
router.get("/Parkings?", getByColor);
module.exports = router;
