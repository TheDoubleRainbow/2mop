import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const vacancySchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Number, default: Math.floor( Date.now() / 1000) },
  photo: { type: String, default: "" },
  description: { type: String, required: true},
  ownerId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  location: {
    placeId: { type: String, required: true},
    formattedAddress: { type: String, required: true}
  },
  types: { type: [String], default: [] },
  requiredSkills: { type: [String], default: [] },
}, {
  versionKey: false
});

vacancySchema.plugin(mongoosePaginate);

const vacancyModel = mongoose.model('Vacancy', vacancySchema);

export default vacancyModel;