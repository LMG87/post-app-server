const Queue = require("bull");
const jobProcessor = require("../workers/job.processor");
const config = require("../config");

const mainQueue = new Queue("mainQueue", {
    redis: { port: config.redis.port, host: config.redis.host },
});

mainQueue.process(jobProcessor);

module.exports = mainQueue;