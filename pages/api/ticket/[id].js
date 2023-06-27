import dbConnect from "@/dbServices/connect";

export default async function handler(req, res) {
  await dbConnect();
}
