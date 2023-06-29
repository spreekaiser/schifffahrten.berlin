import dbConnect from "@/dbServices/connect";
import Ticket from "@/dbServices/models/Ticket";

export default async function handler(req, res) {
  await dbConnect();

  // console.log("Req-Body  ---------->  ", req);

  switch (req.method) {
    case "GET":
      const ticket = await Ticket.findById(req.query.id);
      console.log("req.query.id: ", req.query);
      if (!ticket) {
        return res.status(404).json({ status: "ID not found for this Ticket" });
      }

      console.log({ ticket });
      return res.status(200).json(ticket);
    case "PUT":
      await Ticket.findByIdAndUpdate(req.query.id, {
        $set: req.query.id,
      });
      return res.status(200).json({ message: "successfully updated" });
    case "DELETE":
      await Ticket.findByIdAndDelete(req.query.id);
      return res.status(200).json({ message: "successfully deleted" });
  }
}
