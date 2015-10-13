/**
 * Our Schema for Feedback
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the Feedback Schema
var feedbackSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true},
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, required: true }
});

// The primary Feedback model
var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;