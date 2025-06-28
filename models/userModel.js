const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    //user
    name: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: { type: String, enum: ["client", "admin", "moderateur"] },

    age: Number,
    etat: Boolean,
    image_User: { type: String, default: "client.png" },
    connected: Boolean,
    //admin

    //forni

    //moderateur

    //

    //Rleation
    //   Notification: [{type: mongoose.Schema.Types.ObjectId, ref:"Notif" }], // Many
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }], // Many
    //car: {type: mongoose.Schema.Types.ObjectId, ref:"Car" } // one
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const User = this;
    const salt = await bcrypt.genSalt();
    User.password = await bcrypt.hash(User.password, salt);
    //
    User.etat = false;
    User.connected = false;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw new Error("incorrect password");
    }
  } else {
    throw new Error("incorrect email");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
