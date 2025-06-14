const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      require: true,
      unique:true,
    },
    password: {
      type: String,
      require: true,
    },
    role: { type: String, enum: ["client", "admin", "moderateur"] },
    age: Number,
    etat: Boolean,
    image_User: { type: String, default: "client.png" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const User = this;
    const salt = await bcrypt.genSalt();
    User.password = await bcrypt.hash(User.password,salt);  
    //
    User.etat = false;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
