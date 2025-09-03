// model
const MissingPerson = require("../models/missing_person");

async function addMissingPerson(req, res) {
  const { name, location, lat, lng, image, noticeable_mark } = req.body;
  try {
    const newMissingPerson = new MissingPerson({
      name,
      location,
      lat,
      lng,
      image,
      noticeable_mark,
    });
    console.log(req.body);
    const savedMissingPerson = await newMissingPerson.save();
    res.status(201).json(savedMissingPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllMissingPerson(req, res) {
  try {
    const missingPersons = await MissingPerson.fetchAllMissingPerson();
    console.log(missingPersons);
    res.status(200).json(missingPersons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addMissingPerson,
  getAllMissingPerson,
};
