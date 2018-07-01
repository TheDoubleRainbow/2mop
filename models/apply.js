import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'

const Schema = mongoose.Schema;

const applySchema = new mongoose.Schema({
    applyerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    eventType: {type: String, required: true},
    eventId: {type: String, required: true}
}, {
  versionKey: false
});

applySchema.plugin(mongoosePaginate);

const applyModel = mongoose.model('Apply', applySchema);

export default applyModel;