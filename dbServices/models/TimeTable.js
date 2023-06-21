import mongoose from "mongoose";

const { Schema } = mongoose;

const timeTableSchema = new Schema({
  time: {},
});

const TimeTable =
  mongoose.models.Timetable || mongoose.model("Timetable", timeTableSchema);

export default TimeTable;
