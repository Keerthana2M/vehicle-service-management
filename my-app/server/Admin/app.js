const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const authRoutes = require("./Services/authServices.js");
const carRoutes = require("./Services/car_services.js");
const serviceRoutes = require("./Services/car_washService.js");
const orderRoutes = require("./Services/order_services.js");
const mechanicRoutes = require("./Services/mechanic_service.js");
const productRoutes = require("./Services/carProducts.js");

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));





const connectDB = async () => {
  try {
    const uri = "mongodb+srv://root:mySecurePassword@learnmongodb.tuuzo.mongodb.net/myDatabase?retryWrites=true&w=majority";


    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    if (error.cause) {
      console.error("Detailed Cause:", error.cause);
    }
    process.exit(1); // Exit the process with failure
  }
};

connectDB();


const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("Connected to the database!");
});




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//For preventing CORS ERRORS  (Postman is just a testing tool)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Every request from admin route goes through this url : /admin
app.use("/admin/auth", authRoutes);
app.use("/admin/car-func", carRoutes);
app.use("/admin/car-services", serviceRoutes);
app.use("/admin/order", orderRoutes);
app.use("/admin/mechanic", mechanicRoutes);
app.use("/admin/car-products", productRoutes);

//Server Side Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
