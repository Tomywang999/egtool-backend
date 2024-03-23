const mongoose = require("mongoose");

const toeflCorrectionSchema = new mongoose.Schema({
  questions: {
    type: String,
    required: true,
  },
  toeflCorrectionDate: {
    type: Date,
    default: Date.now,
  },
  useranswers: {
    type: String,
    required: true,
  },
  toeflCorrectionStatus: {
    type: Boolean,
    default: false,
    required: true,
  },
  toeflCorrectionComment: {
    type: String,
    required: true,
  },
  overallscore: {
    type: Number,
    required: true,
  },
  highscoreexample: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ToeflCorrection", toeflCorrectionSchema);