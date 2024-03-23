const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter"],
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
