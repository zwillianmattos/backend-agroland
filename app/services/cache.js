const NodeCache = require("node-cache");
const appCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

module.exports = {
    setCache(key, data) {
        return appCache.set(key, data, 3600)
    },
    getCache(key) {
        console.log("[Loading data from]: Cache")
        if (appCache.has(key))
            return appCache.get(key)
        return false;
    },
}
