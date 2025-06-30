import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "specialization name is required "],
    },
    description: {
      type: String,
      required: [true, "specialization description is required"],
    },
    shopId: {
      type: Object,
      required: [true, "shop id is required"],
      ref: "shopOwnerCollection",
    },
  },
  { timestamps: true }
);

const specializationModel = mongoose.model(
  "specializationCollection",
  specializationSchema
);

export default specializationModel;
