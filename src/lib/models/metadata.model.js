import mongoose from "mongoose";
const Schema = mongoose.Schema;
const metadataSchema = new Schema({
  salary_da: {
    type: Number,
    required: true,
  },
  salary_hra: {
    type: Number,
    required: true,
  },
  salary_bonus: {
    type: Number,
    required: true,
  },
  salary_pf: {
    type: Number,
    required: true,
  },
  salary_professionl_tax: {
    type: Number,
    required: true,
  },
  updated_by: {
    type: Schema.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const MetaData =
  mongoose.model.MetaData || mongoose.model("MetaData", metadataSchema);

export default MetaData;
