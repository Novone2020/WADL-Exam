const mongoose = require('mongoose');

const Student = mongoose.Schema({
  name: { type: String },
  rollno: { type: Number },
  wad_marks: Number,
  cc_marks: Number,
  dsbda_marks: Number,
  cns_marks: Number,
  ai_marks: Number,
});

module.exports = mongoose.model('Student', Student);
