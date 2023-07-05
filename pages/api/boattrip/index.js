// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/dbServices/connect";
import BoatTrip from "@/dbServices/models/BoatTrip";

export default async function handler(req, res) {
  await dbConnect();

  // if (req.method === "GET") {
  //   const boatTrips = await BoatTrip.find();
  //   console.log("api - boatTrips: ", boatTrips);
  //   return res.status(200).json(boatTrips);
  // }

  switch (req.method) {
    case "GET":
      const boatTrips = await BoatTrip.find();
      // console.log("api - boatTrips: ", boatTrips);
      return res.status(200).json(boatTrips);
    case "POST":
      try {
        const boatTripData = request.body;
        const boatTrip = new BoatTrip(boatTripData);
        await boatTrip.save();
        return res.status(201).json({ status: "New boat trip created" });
      } catch (error) {
        console.log("Error: ", error);
        return res.status(400).json({ error: error.message });
      }
  }
}
