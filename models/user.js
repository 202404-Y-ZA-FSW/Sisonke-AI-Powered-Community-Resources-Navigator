
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true,
    match: [/^\S+@\S+.\S+$/, 'Please use a valid email address.'] },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'ngo'], default: 'user' },
  profileData: {
    firstName: String,
    lastName: String,
    bio: String,
  },
    location: {
        city: String,
        state: String,
        country: String,
        zipCode: String
      },
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  savedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  preferences: {
    jobTypes: [String],
    industries: [String],
    salaryRange: {
        min: Number,
        max: Number
      },
      remoteWork: Boolean
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;