import dbConnect from "@/dbServices/connect";
import Ticket from "@/dbServices/models/Ticket";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      const tickets = await Ticket.find();
      return res.status(200).json(tickets);
    case "POST":
      try {
        const ticketData = rquest.body;
        const ticket = new Ticket(ticketData);
        await ticket.save();
        return res.status(201).json("ordered ticket was stored in database");
      } catch (error) {
        console.log("Error by writing in database: ", error);
        return res.status(400).json({ error: error.message });
      }
  }
}
