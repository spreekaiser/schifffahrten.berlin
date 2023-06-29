import mongoose from "mongoose";

const { Schema } = mongoose;

const loginSchema = new Schema({
  Accounts: String,
  Sessions: String,
  Users: String,
  VerificationTokens: String,
});
