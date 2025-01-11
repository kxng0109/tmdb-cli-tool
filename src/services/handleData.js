import Table from "cli-table3";
import { errorHandler } from "../utils/errors.js";
import fetchGenres from "./fetchGenres.js";
import redisClient from "./redisClient.js";

const handleData = async (jsonData) => {
	try {
		let table = new Table({
			head: ["Title", "Genre", "Release date"],
			colWidths: [40, 40, 15]
		});
		const genreTexts = await fetchGenres();

		const idToText = (genreIDArray) => {
			let genreTextArray = [];
			genreIDArray.map((id) => {
				let text = (genreTexts.find(genre => genre.id === id)).name || id;
				genreTextArray.push(text)
			});
			return genreTextArray;
		};

		jsonData.map((data) =>
			//To display as objects
			// console.log({
			// 	title: data.title,
			// 	genre: idToText(data.genre_ids),
			// 	releaseDate: data.release_date,
			// }),
			table.push([data.title, idToText(data.genre_ids).toString(), data.release_date])
		);

		console.log(table.toString())
	} catch (err) {
		errorHandler(err);
	} finally{
		redisClient.disconnect();
	}
};

export default handleData;
