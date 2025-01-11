import axios from "axios";
import { errorHandler } from "../utils/errors.js";
import logOngoing from "../utils/logOngoing.js";
import logSuccess from "../utils/logSuccess.js";
import setMovieType from "../utils/setMovieType.js";
import handleData from "./handleData.js";
import redisClient from "./redisClient.js";

const fetchMovieData = async (movieType) => {
	try {
		movieType = setMovieType(movieType);
		logOngoing("Fetching data from API...");

		const redisMovieData = await redisClient.get(movieType);
		if (redisMovieData) {
			logOngoing("Fetching from Redis Cache instead.");
			await handleData(JSON.parse(redisMovieData));
			return;
		}

		const url = `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=1`;
		const options = {
			method: "get",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		};

		const res = await axios.get(url, options);
		const movies = res.data.results;
		if (!movies) errorHandler("Resource did not return anything");
		logSuccess("Fetched data from API");
		//Expires in 10 minutes
		await redisClient.setEx(movieType, 600, JSON.stringify(movies));
		await handleData(movies);
	} catch (err) {
		errorHandler(err);
	}
};

export default fetchMovieData;
