// REQUIRED PACKAGE
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// BUSINESS LISTING SCHEMA
const BusinessListingSchema = new Schema({
    businessName: {
        type: String,
        required: true
    },
    businessDescription: {
        type: String,
        required: true
    },
    businessAddress: {
        type: String,
        required: true
    },
    businessPhone: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true
    },
    businessWebsite: {
        type: String
    },
    businessCategory: {
        type: String,
        required: true,
    },
    businessImage: {
        type: String,
        required: true
    },
    businessOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// EXPORTING THE BUSINESS LISTING MODEL
const BusinessListing = mongoose.model('BusinessListing', BusinessListingSchema);
module.exports = BusinessListing;