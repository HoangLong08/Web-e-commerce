require("dotenv").config();
const nodemon = require("nodemon");
const express = require("express");
const cookieParser = require("cookie-parser");

const setAssociation = require("./src/models");

const addressRouter = require("./src/routes/address");
const userRouter = require("./src/routes/users");
const authRouter = require("./src/routes/auth");
const productRouter = require("./src/routes/products");
const categoryRouter = require("./src/routes/categories");
const brandRouter = require("./src/routes/brands");
const evaluateRouter = require("./src/routes/evaluates");
const uploadRouter = require("./src/routes/uploads");
const orderRouter = require("./src/routes/orders");
const paymentRouter = require("./src/routes/payment");
const rsRouter = require("./src/routes/rs");
const dashboardRouter = require("./src/routes/dashboards");
const executeAll = require("./craw-data");
const db = require("./utils/database");

const app = express();

try {
  setAssociation();
  //craw -data from website the gioi di dong
  executeAll();
} catch (error) {}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*',);
  const allowedOrigins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:9000",
    "http://localhost:9000",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, Origin, X-Requested-With"
  );
  next();
});

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/api/v1/address/", addressRouter);
app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/products/", productRouter);
app.use("/api/v1/categories/", categoryRouter);
app.use("/api/v1/brands/", brandRouter);
app.use("/api/v1/evaluates/", evaluateRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/payments/", paymentRouter);
app.use("/api/v1/uploads/", uploadRouter);
app.use("/api/v1/rs/", rsRouter);
app.use("/api/v1/dashboards/", dashboardRouter);
app.use(`/images`, express.static(__dirname + "/src/uploads"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 5000}`);
});
