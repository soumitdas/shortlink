const { auth } = require("../config/firebase");
const { HttpError } = require("../utils/helper");

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const isAuthenticated = async (req, _, next) => {
  try {
    const authToken = extractToken(req);

    if (!authToken) {
      req.auth = {};
      next();
      return;
    }
    const decodedToken = await auth.verifyIdToken(authToken);

    req.auth = decodedToken;
    next();
  } catch (err) {
    next(err);
  }
};

const requiredAuth = (req, _, next) => {
  try {
    const { uid } = req.auth;
    if (!uid) {
      throw new HttpError(401, "User is not authenticated");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { isAuthenticated, requiredAuth };
