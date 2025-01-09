import axios from "axios";
import { errorHandler, errorMessage } from "../utils/errors.js";
import setMovieType from "../utils/setMovieType.js";
import handleData from "./handleData.js";


const fetchMovieData = async(movieType) =>{
	try{
		movieType = setMovieType(movieType);

		const url = `https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=1`
		const options = {
			method: "get",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`
			},
		};

		const res = await axios.get(url, options)
		const movies = res.data.results;
		handleData(movies)
	} catch(err){
		errorHandler(err)
	}
}
//genre_ids, original_language, original_title, overview, release_data, title
export default fetchMovieData;