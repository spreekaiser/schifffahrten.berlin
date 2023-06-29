import dbConnect from "@/dbServices/connect";
import Ticket from "@/dbServices/models/Ticket";

export default async function handler(req, res) {
  await dbConnect();

  // console.log("Req-Body  ---------->  ", req);

  switch (req.method) {
    case "GET":
      const ticket = await Ticket.findById(req.query.id);
      // console.log("req.query.id: ", req.query);
      if (!ticket) {
        return res.status(404).json({ status: "ID not found for this Ticket" });
      }

      console.log({ ticket });
      return res.status(200).json(ticket);
    case "PUT":
      console.log("WE ARE IN THE PUT");
      console.log("API-Slug-ID ++ reg.query.id: ", req.query.id);
      console.log("API-Slug-ID ++ reg.body: ", req.body, typeof req.body);

      await Ticket.findByIdAndUpdate(req.query.id, req.body);
      return res.status(200).json({ message: "successfully updated" });
  }
}
