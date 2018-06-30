import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const vacancySchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Number, default: Math.floor( Date.now() / 1000) },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
  ownerId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  requiredSkills: { type: [String], default: []}
}, {
  versionKey: false
});

vacancySchema.plugin(mongoosePaginate);

const vacancyModel = mongoose.model('Vacancy', vacancySchema);

export default vacancyModel;