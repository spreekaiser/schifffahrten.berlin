import dbConnect from "@/dbServices/connect";
import Ticket from "@/dbServices/models/Ticket";
import QRCode from "qrcode";
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
        // Formulardaten genau wie Ticket Schema in Variable ticket + Datenbank speichern
        const ticket = await new Ticket(req.body).save();

        // QR Code erstellen
        const codeURL = await QRCode.toDataURL(
          `http://127.0.0.1:3000/ticket/${ticket.company}/${ticket._id}`
        );

        // Mail abschicken

        // get ID from saved data in tickets
        // let tripId = await ticket.save().then((result) => result._id);

        // Pass the ID to the front-end
        return res
          .status(201)
          .json(await Ticket.findByIdAndUpdate(ticket._id, { codeURL }));
      } catch (error) {
        console.log("Error by writing in database: ", error);
        return res.status(400).json({ error: error.message });
      }
  }
}
