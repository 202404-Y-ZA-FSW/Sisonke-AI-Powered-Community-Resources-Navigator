// REQUIRED PACKAGE
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// BUSINESS LISTING SCHEMA
const BusinessListingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,  
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    logo: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// EXPORTING THE BUSINESS LISTING MODEL
const BusinessListing = mongoose.model(
  "BusinessListing",
  BusinessListingSchema
);
module.exports = BusinessListing;
