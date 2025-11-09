const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
  title: String,
  first: String,
  last: String
}, { _id: false });

const locationSchema = new mongoose.Schema({
  street: {
    number: Number,
    name: String
  },
  city: String,
  state: String,
  country: String,
  postcode: mongoose.Schema.Types.Mixed, 
  coordinates: {
    latitude: String,
    longitude: String
  },
  timezone: {
    offset: String,
    description: String
  }
}, { _id: false });

const loginSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  username: String
}, { _id: false });

const dobSchema = new mongoose.Schema({
  date: Date,
  age: Number
}, { _id: false });

const registeredSchema = new mongoose.Schema({
  date: Date,
  age: Number
}, { _id: false });


// Main Schema
const userSchema = new mongoose.Schema({
  gender: String,
  name: nameSchema,
  location: locationSchema,
  email: {
    type: String,
    required: true
  },
  login: loginSchema,
  dob: dobSchema,
  registered: registeredSchema,
  phone: String,
  cell: String,
  nat: String
});

module.exports = mongoose.model('User', userSchema);