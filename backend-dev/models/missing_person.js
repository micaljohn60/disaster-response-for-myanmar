const mongoose = require("mongoose");

const MissingPersonSchema = new mongoose.Schema({
  name: { type: String, require: true },
  location: { type: String, require: true },
  lat: { type: Number },
  lng: { type: Number },
  image: { type: String },
  noticeable_mark: { type: String },
});

MissingPersonSchema.statics.fetchAllMissingPerson = function () {
  return this.find({});
};

const MissingPerson = mongoose.model("MissingPerson", MissingPersonSchema);
module.exports = MissingPerson;
