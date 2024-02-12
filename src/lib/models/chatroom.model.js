import mongoose from "mongoose";
const Schema = mongoose.Schema;
const chatroomSchema = new Schema({
  message: {
    type: [String],
    validate: {
      validator: (v) => v.split(":").length === 2,
      message: (prop) => `${prop.name} is not a valid formate -> ${prop.value}`,
    },
  },
});

const Chatroom =
  mongoose.model.Chatroom || mongoose.model("Chatroom", chatroomSchema);

export default Chatroom;
