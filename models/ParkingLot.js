const { Schema, model } = require("mongoose");

const parkingLotSchema = new Schema({
  capacity: {
    type: Number,
    required: [true, "Provide Capacity"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parkings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Parking",
    },
  ],
});

const ParkingLotModel = model("ParkingLot", parkingLotSchema);

module.exports = ParkingLotModel;
