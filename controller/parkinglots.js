const ParkingLot = require("../models/ParkingLot");

exports.createParkingLot = async (req, res) => {
  try {
    const body = await req.body;
    let { capacity, id } = body;
    if (capacity === undefined || typeof capacity !== "number") {
      return res.status(400).json({
        isSuccess: false,
        error: { reason: "Invalid Capacity" },
      });
    }
    capacity = parseInt(capacity);
    if (id) {
      body["_id"] = id;
    } else {
      return res
        .status(400)
        .json({ isSuccess: false, error: { reason: "Invalid ID" } });
    }

    if (capacity <= 0 || capacity > 2000) {
      return res.status(400).json({
        isSuccess: false,
        error: { reason: "Capacity exceeds maximum limit" },
      });
    }
    const lot = await ParkingLot.create(body);
    return res.status(200).json({
      isSuccess: true,
      response: {
        id: lot?._id,
        capacity: lot?.capacity,
        isActive: lot?.isActive,
      },
    });
  } catch (e) {
    console.log("Error in creating parking lot ", e);
    res.status(400).json({
      message: "Error in creating parking lot ",
      e,
    });
  }
};

exports.getByColor = async (req, res) => {
  try {
    const query = req.query;
    const { color, parkingLotId } = query;
    const registrations = await Parking.find({
      $and: [{ color: color, parkingLotId: parkingLotId, status: "PARKED" }],
    }).select({ color: 1, registrationNumber: 1 });
    if (data.length > 0) {
      return res.status(200).json({
        isSuccess: true,
        response: {
          registrations,
        },
      });
    } else {
      return res.status(400).json({
        isSuccess: true,
        error: {
          reason: `No car found with color ${color}`,
        },
      });
    }
  } catch (e) {
    console.log("Error in creating parking lot ", e);
    res.status(400).json({
      message: "No car found with color WHITE",
      e,
    });
  }
};

exports.getBySlots = async (req, res) => {
  try {
    const query = req.query;
    const { color, parkingLotId } = query;
    const registrations = await Parking.find({
      $and: [{ color: color, parkingLotId: parkingLotId, status: "LEFT" }],
    }).select({ color: 1, slotNumber: 1 });
    if (data.length > 0) {
      return res.status(200).json({
        isSuccess: true,
        response: {
          registrations,
        },
      });
    } else {
      return res.status(400).json({
        isSuccess: true,
        error: {
          reason: `No car found with color ${color}`,
        },
      });
    }
  } catch (e) {
    console.log("Error in creating parking lot ", e);
    res.status(400).json({
      message: "No car found with color WHITE",
      e,
    });
  }
};
