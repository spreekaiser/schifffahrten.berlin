import dbConnect from "@/dbServices/connect";
import Ticket from "@/dbServices/models/Ticket";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      const tickets = await Ticket.find();
      return res.status(200).json(tickets);
    case "POST":
      console.log("api - Ticket/index: -------- >> :  ", req.body);
      try {
        // const ticketData = JSON.parse(req.body);
        const ticket = new Ticket(req.body);

        // Mail abschicken

        // get ID from saved data in tickets
        // let tripId = await ticket.save().then((result) => result._id);

        // Pass the ID to the front-end
        return res.status(201).json(await ticket.save());
      } catch (error) {
        console.log("Error by writing in database: ", error);
        return res.status(400).json({ error: error.message });
      }
  }
}
