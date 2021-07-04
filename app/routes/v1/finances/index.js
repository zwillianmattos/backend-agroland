const express = require('express');
const router = express.Router();
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { setCache, getCache } = require("../../../services/cache");
const cronFinances = require("../../../services/cron_finances")

router.get('/', async (req, res) => {

    const { q } = req.query;

    console.log(`finances_${q}`);


    let finances = await getCache(`finances_${q}`);
    if (!finances) {
        finances = await cronFinances({
            query: q
        });
    }

    res.status(200).send({
        status: true,
        finances: finances
    });
});

module.exports = router;