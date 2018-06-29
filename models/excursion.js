import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const excursionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
  organizerId: { type: Schema.Types.ObjectId, ref: 'Company', required: true  },
  date: { type: String, required: true},
  time: { type: String, default: ""},
});

const excursionModel = mongoose.model('Excursion', excursionSchema);

export default excursionModel;

excursionSchema.pre