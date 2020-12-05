const mongoose = require("mongoose");
const { nanoid } = require("../utils/helper");
const { APP_BASE_URL } = require("../config");

const visitSchema = new mongoose.Schema(
  {
    referrer: String,
    ip: String,
    location: String,
    browser: { name: String, version: String },
    os: String,
    device: {
      type: String,
      enum: ["Mobile", "Tablet", "Desktop"],
    },
  },
  { timestamps: true }
);

const linkSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      minlength: 5,
      maxlength: 20,
      trim: true,
      unique: true,
      required: true,
    },
    longUrl: {
      type: String,
      required: true,
      trim: true,
    },
    visits: {
      type: [visitSchema],
      default: [],
    },
    createdBy: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

linkSchema.virtual("customShortCode").set(function (shortCode) {
  this.shortCode = shortCode ? shortCode : nanoid();
});

linkSchema.virtual("clickCount").get(function () {
  return this.visits ? this.visits.length : undefined;
});

linkSchema.virtual("shortUrl").get(function () {
  return `${APP_BASE_URL}/${this.shortCode}`;
});

module.exports = mongoose.model("Link", linkSchema);
