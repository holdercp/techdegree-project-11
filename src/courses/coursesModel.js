const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  estimatedTime: String,
  materialsNeeded: String,
  steps: [
    {
      _id: false,
      stepNumber: Number,
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
