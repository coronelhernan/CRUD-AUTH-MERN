import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
			// El usuario es una propiedad Id en mongodb
      type: mongoose.Types.ObjectId,
      ref: "User", // Referencia al modelo User
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);