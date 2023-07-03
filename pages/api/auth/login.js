import bcrypt from "bcrypt";
import Partner from "@/dbServices/models/Partner";
import dbConnect from "@/dbServices/connect";
import cookie from "cookie";
import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(handler);

async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { company, name, password } = req.body;
    if (!(company || name || password)) {
      return res.status(400).json({ success: false });
    }
    console.log(company, name, password);
    // hash the password
    const partner = await Partner.findOne({
      company,
      name,
    });
    if (partner) {
      console.log("Parter in auth: ", partner);
      const match = bcrypt.compareSync(password, partner.password);
      if (match) {
        // set the cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", partner._id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
          })
        );
        req.session.partnerId = partner._id;
        await req.session.save();
        return res.status(200).json({ success: true });
      }
    }
    res.status(401).json({ success: false });
  }
}
