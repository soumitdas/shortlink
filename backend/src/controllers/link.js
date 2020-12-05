const Link = require("../models/link");
const { HttpError, handleAnalyticsData } = require("../utils/helper");

const getAll = async (req, res, next) => {
  const { uid } = req.auth;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const links = await Link.find({ createdBy: uid })
      .limit(limit)
      .skip((page - 1) * limit)
      .select("-visits")
      .sort("-createdAt")
      .exec();

    if (links.length < 1) {
      throw new HttpError(404, "No link found");
    }

    const count = await Link.countDocuments({ createdBy: uid }).exec();

    return res.json({
      status: "SUCCESS",
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      perPage: limit,
      count,
      data: links,
      message: `${links.length} links found`,
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { shortCode } = req.params;

  try {
    const link = await Link.findOne({ shortCode })
      .select("-visits -createdBy")
      .exec();

    if (!link) {
      throw new HttpError(404, "link not found");
    }

    return res.json({
      status: "SUCCESS",
      data: link,
      message: "link found",
    });
  } catch (err) {
    next(err);
  }
};

const getByIdAnalytics = async (req, res, next) => {
  const { uid } = req.auth;
  const { shortCode } = req.params;

  try {
    const link = await Link.findOne({ shortCode, createdBy: uid }).exec();

    if (!link) {
      throw new HttpError(404, "link not found");
    }

    const analytics = handleAnalyticsData(link.visits);

    const response = {
      shortCode: link.shortCode,
      longUrl: link.longUrl,
      clickCount: link.clickCount,
      shortUrl: link.shortUrl,
      analytics,
    };

    return res.json({
      status: "SUCCESS",
      data: response,
      message: "link found",
    });
  } catch (err) {
    next(err);
  }
};

// const updateById = async (req, res, next) => {
//     const { uid } = req.auth;
//   const { shortCode } = req.params;
//   const {  }
// }

module.exports = { getAll, getById, getByIdAnalytics };
