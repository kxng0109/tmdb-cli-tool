import { errorHandler } from "../utils/errors.js";
import fetchGenres from "./fetchGenres.js";

const handleData = async (jsonData) => {
	try {
		const genreTexts = await fetchGenres();

		const idToText = (genreIDArray) => {
			let genreTextArray = [];
			genreIDArray.map((id) => {
				genreTexts.forEach((genre) => {
					if (genre.id === id) genreTextArray.push(genre.name);
				});
			});
			return genreTextArray;
		};

		jsonData.map((data) =>
			console.log({
				title: data.title,
				genre: idToText(data.genre_ids),
				releaseDate: data.release_date,
			}),
		);
	} catch (err) {
		errorHandler(err);
	}
};

export default handleData;
