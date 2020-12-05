const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((e) => console.error(e));

app.use(express.json());
app.use(
  cors({
    origin: config.FRONTEND_BASE_URL,
    optionsSuccessStatus: 200,
  })
);
app.disable("x-powered-by");
app.set("trust proxy", true);

app.use(routes);

// Error Handelling
app.use((err, req, res, next) => {
  if (err) {
    if (!err.statusCode) {
      err.statusCode = err.name === "UnauthorizedError" ? 401 : 400;
    }
    return res.status(err.statusCode).json({
      status: "ERROR",
      data: {},
      message: err.message,
    });
  }
  next();
});

app.listen(config.PORT, () => {
  console.log(`Server started at PORT ${config.PORT}`);
});
