const express = require('express');
const router = express.Router();
const Crawler = require("crawler");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { setCache, getCache } = require("../../../services/cache");
const cronNews = require("../../../services/cron_news")

router.get('/', async (req, res) => {

    let news = getCache("news");
    if (!news) {
        news = await cronNews();
    }

    res.status(200).send({
        status: "ok",
        totalResults: news.length,
        articles: news
    });
});

module.exports = router;