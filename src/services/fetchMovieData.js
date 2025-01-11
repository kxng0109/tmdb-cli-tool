import axios from "axios";
import { errorHandler, errorMessage } from "../utils/errors.js";
import logOngoing from "../utils/logOngoing.js";
import logSuccess from "../utils/logSuccess.js";
import setMovieType from "../utils/setMovieType.js";
import fetchGenres from "./fetchGenres.js";
import handleData from "./handleData.js";
import redisClient from "./redisClient.js";

const fetchMovieData = async (movieType, page, genre) => {
	movieType = setMovieType(movieType);
	let url = `/movie/${movieType}?language=en-US&page=${page || 1}`
	let redisValue = `${movieType}?page=${page || 1}`;

	if(genre){
		const genres = await fetchGenres();
		let genreObject = genres.find(g => g.name.toLowerCase() === genre.toLowerCase());
		if(!genreObject) errorMessage("Genre does not exist.");
		genre = genreObject.id;
		url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page || 1}&sort_by=popularity.desc&with_genres=${genre}`;
		redisValue = `${redisValue}&genre=${genre}`
	}

	try {
		logOngoing("Fetching data from API...");

		const redisMovieData = await redisClient.get(redisValue);
		if (redisMovieData) {
			logOngoing("Fetching from Redis Cache instead.");
			await handleData(JSON.parse(redisMovieData));
			return;
		}

		const options = {
			method: "get",
			url,
			baseURL: "https://api.themoviedb.org/3",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		};

		const res = await axios(options);
		const movies = res.data.results;
		if (!movies || !movies.length) errorHandler("Resource did not return anything");
		logSuccess("Fetched data from API");
		//Expires in 10 minutes
		await redisClient.setEx(redisValue, 600, JSON.stringify(movies));
		await handleData(movies);
	} catch (err) {
		errorHandler(err);
	}
};

export default fetchMovieData;
