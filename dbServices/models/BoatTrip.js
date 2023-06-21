import mongoose from "mongoose";

const { Schema } = mongoose;

const boatTripSchema = new Schema({
  name: String,
  imgaeURL: String,
  descriptionShort: String,
  descriptionLong: String,
  locations: String,
  durationInHours: Number,
  river: String,
});

const BoatTrip =
  mongoose.models.BoatTrip || mongoose.model("Boattrips", boatTripSchema);

export default BoatTrip;
