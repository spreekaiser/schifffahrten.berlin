import mongoose from "mongoose";

const { Schema } = mongoose;

const boatTripSchema = new Schema({
  name: String,
  imgaeName: String,
  descriptionShort: String,
  descriptionLong: String,
  locations: String,
  durationInHours: Number,
  price: Number,
  company: String,
  logo: String,
  river: Array,
  landingPlace: Array,
  tags: Array,
});

const BoatTrip =
  mongoose.models.Boattrip || mongoose.model("Boattrip", boatTripSchema);

export default BoatTrip;
