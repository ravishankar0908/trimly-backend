import mongoose from "mongoose";

const stylistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "stylist name is required"],
    },
    gender: {
      type: String,
      required: [true, "stylist gender is required"],
    },
    dateofbirth: {
      type: Date,
      required: [true, "stylist date of birth is required"],
    },
    experience: {
      type: Number,
      required: [true, "stylist experience is required"],
    },
    level: {
      type: String,
      required: [true, "stylist level is required"],
    },
    specialization: {
      type: [String],
      required: [true, "specialization is required"],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "shop id is required"],
      ref: "shopOwnerCollection",
    },
  },
  { timestamps: true }
);

const stylistModel = mongoose.model("stylistDetailCollection", stylistSchema);
export default stylistModel;
