const Redis = require("ioredis");

// Initialize client
const redis = new Redis(process.env.REDIS_URL);

module.exports = redis;
