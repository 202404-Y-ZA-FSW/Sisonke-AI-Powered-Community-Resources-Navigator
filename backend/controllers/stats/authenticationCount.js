const userModel = require("../../models/user/user");

const getUserCount = async () => {
  try {
    const userCount = await userModel.countDocuments();
    return userCount;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching user count");
  }
};

module.exports = { getUserCount };
