import mongoose from "mongoose";

const stylistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "stylist name is required"],
    },
    gender: {
      type: String,
      require: [true, "stylist gender is required"],
    },
    dateofbirth: {
      type: Date,
      require: [true, "stylist date of birth is required"],
    },
    experience: {
      type: Number,
      require: [true, "stylist experience is required"],
    },
    level: {
      type: String,
      require: [true, "stylist level is required"],
    },
    specialization: {
      type: [String],
      require: [true, "specialization is required"],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    shopId: {
      type: Object,
      required: [true, "shop id is required"],
      ref: "shopOwnerCollection",
    },
  },
  { timestamps: true }
);

const stylistModel = mongoose.model("stylistDetailCollection", stylistSchema);
export default stylistModel;
