import { withSessionRoute } from "@/lib/session";

export default withSessionRoute(logoutRoute);

async function logoutRoute(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Not found" });
  }
  req.session.destroy();
  res.json({ success: true });
}
