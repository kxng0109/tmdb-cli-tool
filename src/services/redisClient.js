import { config } from "dotenv";
import { createClient } from "redis";
import { errorMessage } from "../utils/errors.js";
import logOngoing from "../utils/logOngoing.js";
import logSuccess from "../utils/logSuccess.js";
config();

const redisClient = createClient({
	username: process.env.REDIS_USERNAME || undefined,
	password: process.env.REDIS_PASSWORD || undefined,
	socket: {
		host: process.env.REDIS_HOST || "127.0.0.1",
		port: process.env.REDIS_PORT || 6379,
	},
});

if (!process.env.REDIS_HOST && !process.env.REDIS_PASSWORD) {
	logOngoing("No Redis cloud credentials found. Falling back to local Redis instance.");
}

redisClient.on("error", (err) => errorMessage(`Redis client error: ${err}`));

(async () => {
	try {
		await redisClient.connect();
		logSuccess("Redis client connected.");
	} catch (err) {
		errorMessage(`Failed to connect to the Redis client: ${err.message}`);
	}
})();

export default redisClient;
