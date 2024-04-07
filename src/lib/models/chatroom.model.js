import mongoose from "mongoose";
const Schema = mongoose.Schema;
const chatroomSchema = new Schema({
  message: {
    type: String,
    required: true,
    immutable: true,
  },
  sent_by: {
    type: Schema.ObjectId,
    ref: "Employee",
    immutable: true,
  },
  date_time: {
    type: Date,
    default: Date.now(),
    required: true,
    immutable: true,
  },
});

const Chatroom =
  mongoose.models.Chatroom || mongoose.model("Chatroom", chatroomSchema);

export default Chatroom;
