const forumModel = require("../../models/forum/forum"); 

const getForumCount = async () => {
  try {
    const forumCount = await forumModel.countDocuments();
    return forumCount;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching forum count");
  }
};

module.exports = { getForumCount };