const { FRONTEND_BASE_URL, IPSTACK_KEY } = require("../config");
const Link = require("../models/link");
const { matchedData } = require("express-validator");
const { getHostNameFromUrl } = require("../utils/helper");
const fetch = require("node-fetch");

const shorten = async (req, res, next) => {
  const { longUrl, customShortCode } = matchedData(req, {
    locations: ["body"],
  });

  const { uid } = req.auth;

  try {
    const linkDoc = await Link.create({
      longUrl,
      customShortCode: uid ? customShortCode : "",
      createdBy: uid,
    });

    return res.json({
      status: "SUCCESS",
      data: {
        shortUrl: linkDoc.shortUrl,
        longUrl: linkDoc.longUrl,
        createdAt: linkDoc.createdAt,
      },
      message: "The URL shorted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const redirect = async (req, res, next) => {
  const { shortCode } = req.params;

  try {
    if (shortCode.slice(-1) === "+") {
      return res.redirect(
        `${FRONTEND_BASE_URL}/links/${shortCode.slice(0, -1)}`
      );
    }

    let linkDoc = await Link.findOne({ shortCode }).exec();

    if (!linkDoc) {
      return res
        .status(404)
        .send(
          `<h1>Invalid Link</h1><a href="${FRONTEND_BASE_URL}">Back to Home</a>`
        );
    }

    // Only save the visit data when the shortlink created using an account
    if (linkDoc.createdBy) {
      // Fetch location using IP address
      const ip = req.ip.split(":")[0];
      const { city, country_code } = await fetch(
        `http://api.ipstack.com/${ip}?access_key=${IPSTACK_KEY}`
      )
        .then((resp) => resp.json())
        .catch(() => ({}));

      const location =
        city && country_code ? city + "-" + country_code : "Unknown";

      const visit = {
        referrer: getHostNameFromUrl(req.get("Referrer") || "Unknown"),
        ip,
        location,
        browser: {
          name: req.useragent.browser,
          version: req.useragent.version,
        },
        os: req.useragent.os,
        device: req.useragent.isMobile
          ? "Mobile"
          : req.useragent.isTablet
          ? "Tablet"
          : "Desktop",
      };

      linkDoc.visits.push(visit);
      await linkDoc.save();
    }

    // const linkDoc = await Link.findOneAndUpdate(
    //   { shortCode },
    //   { $push: { visit } },
    //   { useFindAndModify: false }
    // ).exec();

    return res.redirect(linkDoc.longUrl);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { shorten, redirect };
