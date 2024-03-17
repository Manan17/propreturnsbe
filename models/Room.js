const { Schema, model } = require("mongoose");

const detailsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rent: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  meetingRooms: {
    type: Number,
    required: true,
  },
  images: {
    type: Array(String),
  },
  description: {
    type: String,
  },
  scores: {
    type: JSON,
  },
  owner: {
    type: String,
  },
  addOns: {
    type: Array(JSON),
  },
  inclusion: {
    type: Array(JSON),
  },
});

const ParkingModel = model("Room", detailsSchema);

module.exports = ParkingModel;
