import axios from "axios";
import { createClient } from "redis";
import { errorHandler, errorMessage } from "../utils/errors.js";

const redisClient = await createClient()
	.on("error", (err) => errorMessage(`Redis client error, ${err}`))
	.connect();

const fetchGenres = async () => {
	const options = {
		method: "GET",
		url: "/genre/movie/list?language=en",
		baseURL: "https://api.themoviedb.org/3",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	};

	try {
		const redisGenre = await redisClient.get("genres");
		if (redisGenre) {
			return JSON.parse(redisGenre);
		}

		const res = await axios(options);
		const data = res.data.genres;
		//expire in 1 day
		await redisClient.setEx("genres", 86400, JSON.stringify(data));
		return data;
	} catch (err) {
		errorHandler(err);
	} finally {
		redisClient.disconnect();
	}
};

export default fetchGenres;
