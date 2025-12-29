const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    mobile_number: {
        type: String,
        required: true,
    },

    Age: {
        type: String,
        required: true,
    },

    Gender: {
        type: String,
        required: true,
    },

    From: {
        type: String,
        required: true,
    },

    to: {
        type: String,
        required: true,
    },
    Departure_date: {
        type: String,
        required: true,
    },
    Return_date: {
        type: String,
        required: true,
    },
    Travellers: {
        type: String,
        required: true,
    },
    Travel_type: {
        type: String,
        required: true,
    },
    seat_preference: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    meal: {
        type: String,
        required: true,
    },
    Hotel_required: {
        type: String,
        required: true,
    },
    Room_type: {
        type: String,
        required: true,
    },
    ID_proof: {
        type: String,
        required: true,
    },
    ID_number: {
        type: String,
        required: true,
    },
    ID_number: {
        type: String,
        required: true,
    },
    Special_requests: {
        type: String,
        required: true,
    },
    Emergency_contact: {
        type: String,
        required: true,
    },
});

const travel = mongoose.model("travel", travelSchema, "travel");

module.exports = travel;