import mongoose from "mongoose";

const { Schema } = mongoose;

const timeTableSchema = new Schema({
  time: {},
});

const TimeTable =
  mongoose.models.TimeTable || mongoose.model("timeTable", timeTableSchema);

export default TimeTable;
