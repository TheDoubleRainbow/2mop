import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'

const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Number, default: Math.floor( Date.now() / 1000) },
  photo: { type: String, default: "" },
  description: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  location: {
    placeId: { type: String, required: true},
    formattedAddress: { type: String, required: true}
  },
  date: {
    from: { type: Number, required: true },
    to: { type: Number, required: true },
  },
  types: { type: [String], default: [] },
}, {
  versionKey: false
});

courseSchema.plugin(mongoosePaginate);

const courseModel = mongoose.model('Course', courseSchema);

export default courseModel;