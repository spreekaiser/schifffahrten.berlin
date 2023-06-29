import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/providers/auth
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  // Weitere Optionen und Einstellungen...
});
