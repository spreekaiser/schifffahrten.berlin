import mongoose from "mongoose";

const { Schema } = mongoose;

const boatSchema = new Schema({
  name: { type: String, required: true },
  company: {},
});

const Boat = mongoose.models.Boat || mongoose.model("Boat", boatSchema);

export default Boat;
