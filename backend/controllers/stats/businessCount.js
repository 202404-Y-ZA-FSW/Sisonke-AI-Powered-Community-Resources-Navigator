const businessModel = require("../../models/business");

const getBusinessCount = async () => {
  try {
    const businessCount = await businessModel.countDocuments();
    return businessCount;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching business count");
  }
};

module.exports = { getBusinessCount };
