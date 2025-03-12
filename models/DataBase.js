const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String },
  email: { type: String, required: false, unique: true },
  jobtitle: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] } // Allow specific values only
},{timestamps:true});
// Model
const UserData = mongoose.model("MyTable", userSchema);

module.exports = UserData; // Export the model
