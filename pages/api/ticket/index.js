import dbConnect from "@/dbServices/connect";
import Ticket from "@/dbServices/models/Ticket";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import EmailTemplate_BookedTicket from "@/lib/EmailTemplate_BookedTicket";
import { getEmailText } from "@/lib/EmailTemplate_BookedTicket";

const { SITE_HOST, EMAIL_SERVICE, EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

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
        // console.log("Ticket_ID", ticket);

        // QR Code erstellen
        const codeURL = await QRCode.toDataURL(
          `${SITE_HOST}/ticket/${ticket.company}/${ticket._id}`
        );

        // sending email
        let mailTransporter = nodemailer.createTransport({
          service: EMAIL_SERVICE,
          auth: {
            user: EMAIL_ADDRESS,
            pass: EMAIL_PASSWORD,
          },
        });

        let mailDetails = {
          from: "noreplay@schifffahrten.berlin",
          to: ticket.email,
          subject: `Test mail`,
          html: EmailTemplate_BookedTicket(
            ticket,
            ticket._id,
            codeURL,
            SITE_HOST
          ),
          text: getEmailText(ticket, ticket._id, SITE_HOST),

          // text: "This is the email, when a ticket is booked",
        };

        // ## Zum Überprüfen des Email servers
        // mailTransporter.verify(function (error, success) {
        //   if (error) {
        //     console.log("Email verify Error: ", error);
        //   } else {
        //     console.log("Server is ready to send Emails");
        //     console.log("Succes Data in email verify: ", success);
        //   }
        // });

        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("Error en sending Mail", err);
          } else {
            console.log("Email sent successfuly");
            console.log("Email Data: ", data);
          }
        });

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
