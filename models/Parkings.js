const { Schema, model } = require("mongoose");

const parkingSchema = new Schema({
  registrationNumber: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  slotNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "PARKED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parkingLotId: {
    type: Schema.Types.ObjectId,
    ref: "ParkingLot",
  },
});

const ParkingModel = model("Parking", parkingSchema);

module.exports = ParkingModel;
