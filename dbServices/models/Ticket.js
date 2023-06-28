import mongoose from "mongoose";

const { Schema } = mongoose;

const ticketSchema = new Schema({
  adultTickets: String,
  childTickets: String,
  dateOfTrip: String,
  email: String,
  firstName: String,
  lastName: String,
  priceOfTickets: String,
  tripId: String,
  tripName: String,
  company: String,
});

const Ticket = mongoose.models.Ticket || mongoose.model("ticket", ticketSchema);

export default Ticket;
