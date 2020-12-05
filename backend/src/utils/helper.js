const { dateToDDMMYYYY, dateToMonYYYY } = require("./date");

/**
 * Custom Error constructor
 * @param {number} statusCode HTTP Status code
 * @param {string} message Error Message
 */
function HttpError(statusCode, message) {
  this.statusCode = statusCode;
  this.message = message;
}

// ShortCode Gen Setup
const { customAlphabet } = require("nanoid");
const customChars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const charLength = 6;
const nanoid = customAlphabet(customChars, charLength);

//Handle analytics data
const handleAnalyticsData = (visits) => {
  // const visit = {
  //   referrer: req.get("Referrer") || "",
  //   ip: req.ip,
  //   location,
  //   browser: {
  //     name: req.useragent.browser,
  //     version: req.useragent.version,
  //   },
  //   os: req.useragent.os,
  //   device: req.useragent.isMobile
  //     ? "mobile"
  //     : req.useragent.isTablet
  //     ? "tablet"
  //     : "desktop",
  // }

  if (!(visits instanceof Array)) {
    return {};
  }

  const dataLength = visits.length;

  const browsers = {};
  const os = {};
  const devices = {};
  const referrers = {};
  const locations = {};
  const timestamps = {};

  visits.map((visit) => {
    if (visit.browser.name) {
      browsers[visit.browser.name] = browsers[visit.browser.name]
        ? browsers[visit.browser.name] + 1
        : 1;
    }

    if (visit.os) {
      os[visit.os] = os[visit.os] ? os[visit.os] + 1 : 1;
    }

    if (visit.device) {
      devices[visit.device] = devices[visit.device]
        ? devices[visit.device] + 1
        : 1;
    }

    if (visit.referrer) {
      referrers[visit.referrer] = referrers[visit.referrer]
        ? referrers[visit.referrer] + 1
        : 1;
    }

    if (visit.location) {
      locations[visit.location] = locations[visit.location]
        ? locations[visit.location] + 1
        : 1;
    }

    /**
     * Date data
     * if length <= 30 calculate date wise
     * if length > 30 & calculate month-year wise
     */
    let date = "";
    if (dataLength <= 30) {
      date = dateToDDMMYYYY(visit.createdAt);
    } else {
      date = dateToMonYYYY(visit.createdAt);
    }
    if (date) {
      timestamps[date] = timestamps[date] ? timestamps[date] + 1 : 1;
    }
  });
  return { browsers, os, devices, referrers, locations, timestamps };
};

const getHostNameFromUrl = (url) =>
  url.replace("http://", "").replace("https://", "").split(/[/?#]/)[0];

module.exports = { HttpError, nanoid, handleAnalyticsData, getHostNameFromUrl };
