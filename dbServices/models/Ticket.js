import mongoose from "mongoose";

const { Schema } = mongoose;

const ticketSchema = new Schema({
  tripId: String,
  tripName: String,
  dateOfTrip: Date,
  adultTickets: Number,
  childTickets: Number,
  priceOfTickets: Number,
  firstName: String,
  lastName: String,
  email: String,
});

const Ticket = mongoose.models.Ticket || mongoose.model("ticket", ticketSchema);

export default Ticket;
