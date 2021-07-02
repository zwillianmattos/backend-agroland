const express = require('express');
const router = express.Router();
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { setCache, getCache } = require("../../../services/cache");
const cronFinances = require("../../../services/cron_finances")

router.get('/', async (req, res) => {

    let finances = getCache("finances");
    if (!finances) {
        finances = await cronFinances();
    }

    res.status(200).send({
        status:true,
        finances: finances
    });
});

module.exports = router;