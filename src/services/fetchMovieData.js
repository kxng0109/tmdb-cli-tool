import axios from "axios";
import chalk from "chalk";
import { createClient } from "redis";
import { errorHandler, errorMessage } from "../utils/errors.js";
import setMovieType from "../utils/setMovieType.js";
import handleData from "./handleData.js";

const redisClient = await createClient()
	.on("error", (err) => errorMessage(`Redis client error: ${err}`))
	.connect();

const fetchMovieData = async (movieType) => {
	try {
		movieType = setMovieType(movieType);
		console.log(chalk.yellow("Fetching data from API..."))

		const redisMovieData = await redisClient.get(movieType);
		if (redisMovieData) {
			console.log(chalk.green("Fetching from Redis Cache instead"));
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
		console.log(chalk.green("Fetched data from API"))
		//Expires in 10 minutes
		await redisClient.setEx(movieType, 600, JSON.stringify(movies));
		await handleData(movies);
	} catch (err) {
		errorHandler(err);
	} finally {
		redisClient.disconnect();
	}
};

export default fetchMovieData;
