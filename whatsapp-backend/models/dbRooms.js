import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  name: String,
  avatar: String,
  messages: Array,
});

export default mongoose.model("rooms", roomSchema);
