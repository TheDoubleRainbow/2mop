import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'

const Schema = mongoose.Schema;

const hakatonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Number, default: Math.floor( Date.now() / 1000) },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
  organizerId: {  type: Schema.Types.ObjectId, ref: 'Company', required: true },
  location: { type: String, required: true},
  date: { type: String, required: true},
  time: { type: String, default: ""},
}, {
  versionKey: false
});

hakatonSchema.plugin(mongoosePaginate);

const hakatonModel = mongoose.model('Hakaton', hakatonSchema);

export default hakatonModel;