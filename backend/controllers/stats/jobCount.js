const jobModel = require("../../models/job");

const getJobCount = async () => {
  try {
    const jobCount = await jobModel.countDocuments();
    return jobCount;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching job count");
  }
};

module.exports = { getJobCount };
