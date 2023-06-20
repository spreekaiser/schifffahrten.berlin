import mongoose from "mongoose";

const { Schema } = mongoose;

const boatTripSchema = new Schema({
  name: {},
});

const BoatTrip =
  mongoose.models.BoatTrip || mongoose.model("Boattrips", boatTripSchema);

export default BoatTrip;
