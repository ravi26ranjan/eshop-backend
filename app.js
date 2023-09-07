const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

const api = process.env.API_URL;

// Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

// Routers
const categoryRoutes = require("./routes/categoryServices");
const orderRoutes = require("./routes/orderServices");
const productRoutes = require("./routes/productServices");
const userRoutes = require("./routes/userServices");
// const errorHandler = require("./helpers/error-handler");

app.use(`${api}/categoryServices`, categoryRoutes);
app.use(`${api}/orderServices`, orderRoutes);
app.use(`${api}/productServices`, productRoutes);
app.use(`${api}/userServices`, userRoutes);

mongoose
      .connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "eshop",
      })
      .then(() => {
            console.log("Database is connected");
      })
      .catch((err) => {
            console.log(err);
      });

// Server
app.listen(3000, () => {
      console.log(api);
      console.log("App is ruuning http://localhost:3000");
});
