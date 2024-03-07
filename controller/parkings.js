const ParkingLot = require("../models/ParkingLot");
const Parking = require("../models/Parkings");

const colors = ["RED", "GREEN", "BLUE", "BLACK", "WHITE", "YELLOW", "ORANGE"];

exports.createParking = async (req, res) => {
  try {
    const parkingData = await req.body;
    const { registrationNumber, color, parkingLotId } = parkingData;
    const districtCode = parseInt(registrationNumber.slice(2, 4));
    if (registrationNumber.length != 9 || districtCode > 20) {
      return res.status(400).json({
        message: "Registration Number not Valid",
      });
    }

    if (!colors.includes(color)) {
      return res.status(400).json({
        message: "Invalid Color",
      });
    }
    const parkingLots = await Parking.find({
      $and: [{ parkingLotId: parkingLotId }, { status: "LEFT" }],
    }).sort({ slotNumber: 1 });
    console.log(parkingLots);
    if (parkingLots.length > 0) {
      const parkUpdate = await Parking.findOne({ _id: parkingLots[0]._id });
      const p = await Parking.updateOne(
        { _id: parkUpdate._id },
        {
          registrationNumber: registrationNumber,
          color: color,
          status: "PARKED",
        }
      );
      parkUpdate.registrationNumber = registrationNumber;
      parkUpdate.color = color;
      parkUpdate.status = "PARKED";
      await parkUpdate.save();
      return res.status(200).json({
        isSuccess: true,
        response: {
          slotNumber: parkUpdate?.slotNumber,
          status: parkUpdate?.status,
        },
      });
    } else {
      const count = await Parking.countDocuments();
      parkingData["slotNumber"] = count + 1;
      const parking = await Parking.create(parkingData);
      return res.status(200).json({
        isSuccess: true,
        response: {
          slotNumber: parking?.slotNumber,
          status: parking?.status,
        },
      });
    }
  } catch (e) {
    console.log("Error in creating parking  ", e);
    res.status(400).json({
      message: "Error in creating parking lot ",
      e,
    });
  }
};

exports.deleteParking = async (req, res) => {
  try {
    const parkingData = await req.body;
    const { parkingLotId, registrationNumber } = parkingData;
    const lot = await ParkingLot.find({ _id: parkingLotId });
    if (!lot) {
      return res.status(400).json({
        message: "Invalid parkingLotId",
      });
    }
    const parking = await Parking.findOne({
      $and: [
        { parkingLotId: parkingLotId },
        { registrationNumber: registrationNumber },
      ],
    });
    if (parking) {
      const updatePark = await Parking.updateOne(
        { _id: parking?._id },
        { status: "LEFT" }
      );
      parking.status = "LEFT";
      await parking.save();
      return res.status(200).json({
        isSuccess: true,
        response: {
          slotNumber: parking?.slotNumber,
          registrationNumber: parking?.registrationNumber,
          status: parking?.status,
        },
      });
    }
    res.status(400).json({
      isSuccess: false,
      message: "Car not found",
    });
  } catch (e) {
    console.log("Error in deleting parking  ", e);
    res.status(400).json({
      message: "Error in deleting parking lot ",
      e,
    });
  }
};
