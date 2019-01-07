const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postedOn: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: String,
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
