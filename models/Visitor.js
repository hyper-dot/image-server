import mongoose from 'mongoose';

const { Schema } = mongoose;

const visitorSchema = new Schema({
  ip: String,
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

//If the Post collection does not exist create a new one.
export default mongoose.models.Visitor ||
  mongoose.model('Visitor', visitorSchema);
