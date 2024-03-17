const Room = require("../models/Room");

exports.createRoom = async (req, res) => {
  try {
    const { ...body } = req.body;
    const room = await Room.create(body);
    return res.status(200).json({
      room,
    });
  } catch (e) {
    return res.status(400).json({
      e,
    });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json({
      rooms,
    });
  } catch (e) {
    return res.status(400).json({
      e,
    });
  }
};
