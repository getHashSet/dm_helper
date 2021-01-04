// Loading evnironmental variables here
if (process.env.NODE_ENV !== "production") {
  // console.log('loading dev environments')
  require("dotenv").config();
}
require("dotenv").config();

// ======================= //
// ===== Dependencies ==== //
// ======================= //

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const session = require("express-session");
const MongoStore = require("connect-mongo")//(session);
const passport = require("./utils/passport");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./controllers");

// ======================= //
// ===== Use Express ===== //
// ======================= //

const app = express();

// ======================= //
// ======== Ports ======== //
// ======================= //

const PORT = process.env.PORT || 8080;

// ===================== //
// ===== Middleware ==== //
// ===================== //

app.use(morgan("dev"));

/*app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);*/

app.use(bodyParser.json());

// mongoose
//   .connect(process.env.MONGODB_URI || "mongodb://localhost/tabletopsquire", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((err) => {
//     // console.log(err);
//   });

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("======================Mongoose is connected")
    );

  } catch (e) {
    console.log("=========================could not connect to Database");
  }

// app.use(
//   session({
//     secret: process.env.APP_SECRET || "this is the default passphrase",
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// =================== //
// ===== Passport ==== //
// =================== //

app.use(passport.initialize());
// app.use(passport.session()); // will call the deserializeUser

// =================================== //
// ==== if its production environment  //
// =================================== //

if (process.env.NODE_ENV === "production") {
  // console.log("Prod Mode Enabled")
  app.use(express.static("client/build"));
}

// =================================== //
// ====== Routing & Controllers ====== //
// =================================== //

app.use(routes);

// ======================= //
// ====== React App ====== //
// ======================= //

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ========================= //
// ====== Error handler ==== //
// ========================= //

// app.use(function (err, req, res, next) {
// 	// console.log('====== ERROR =======')
// 	// console.error(err.stack)
// 	// res.status(500)
// })

// ========================== //
// ==== Starting Server ===== //
// ========================== //

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
