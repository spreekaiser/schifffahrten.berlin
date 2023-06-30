import mongoose from "mongoose";

const { Schema } = mongoose;

const partnerSchema = new Schema({
  company: String,
  name: String,
  password: String,
});

const Partner =
  mongoose.models.Partner || mongoose.model("Partner", partnerSchema);

export default Partner;
