import dbConnect from "@/dbServices/connect";
import BoatTrip from "@/dbServices/models/BoatTrip";

export default async function handler(req, res) {
  await dbConnect();

  // console.log("Req-Body  ---------->  ", req);
  switch (req.method) {
    case "GET":
      const boatTrip = await BoatTrip.findById(req.query.id);
      if (!boatTrip) {
        return res
          .status(404)
          .json({ status: "ID not found for this BoatTrip" });
      }

      // console.log({ boatTrip });
      return res.status(200).json(boatTrip);
    case "PUT":
      await BoatTrip.findByIdAndUpdate(_id, {
        $set: req.query.id,
      });
      return res.status(200).json({ message: "successfully updated" });
    case "DELETE":
      await BoatTrip.findByIdAndDelete(_id);
      return res.status(200).json({ message: "successfully deleted" });
  }
}
