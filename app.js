import { Command, Option } from "commander";
import { config } from "dotenv";
import { default as fetchMovieData } from "./src/services/fetchMovieData.js";
import { errorMessage } from "./src/utils/errors.js";
const program = new Command();
config();

program
	.name("tmdb-app")
	.description("Movie type. Options are playing, popular, top and upcoming")
	.addOption(
		new Option("-t, --type <type>", "Movie type").choices([
			"playing",
			"popular",
			"top",
			"upcoming",
		]),
	)
	.action((options) => {
		if(!process.env.TMDB_TOKEN){
			errorMessage("No access token provided. Make sure the 'TMDB_TOKEN' is provided in your .env file.");
		}
		fetchMovieData(options.type)
	});

program.parse();
