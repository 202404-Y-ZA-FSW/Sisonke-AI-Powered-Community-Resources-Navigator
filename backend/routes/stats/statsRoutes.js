const express = require('express');
const router = express.Router();
const { getJobCount } = require('../../controllers/stats/jobCount');
const { getBusinessCount } = require('../../controllers/stats/businessCount');
const { getUserCount } = require('../../controllers/stats/authenticationCount');
const { getForumCount } = require('../../controllers/stats/forumCount'); 

router.get('/counts', async (req, res) => {
  try {
    const jobCount = await getJobCount();
    const businessCount = await getBusinessCount();
    const userCount = await getUserCount();
    const forumCount = await getForumCount(); 

    res.status(200).json({ jobCount, businessCount, userCount, forumCount }); 
  } catch (err) {
    res.status(500).json({ error: "An unexpected error has occurred while trying to fetch counts" });
  }
});

module.exports = router;
