import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  userId: String,
  userName: String,
  userEmail: String,
  rooms: Array,
});

export default mongoose.model("users", UserSchema);
