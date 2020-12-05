if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const parseJson = (Obj) => {
  try {
    return JSON.parse(Obj);
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
  APP_BASE_URL: process.env.APP_BASE_URL,
  FIREBASE_SERVICE_KEY: parseJson(process.env.FIREBASE_SERVICE_ACCOUNT),
  IPSTACK_KEY: process.env.IPSTACK_KEY,
};
