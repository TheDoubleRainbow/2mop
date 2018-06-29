import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const vacancySchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
  employerId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  requiredSkills: { type: [String], default: []}
});

vacancyModel

const vacancyModel = mongoose.model('Vacancy', vacancySchema);

export default vacancyModel;