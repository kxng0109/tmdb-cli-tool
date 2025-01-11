#!/usr/bin/env node

import { Command, Option } from "commander";
import { config } from "dotenv";
import { default as fetchMovieData } from "./src/services/fetchMovieData.js";
import { errorMessage } from "./src/utils/errors.js";
import myParseInt from "./src/utils/myParseInt.js";
const program = new Command();
config();

if(!process.env.TMDB_TOKEN){
	errorMessage("No access token provided. Make sure the 'TMDB_TOKEN' is set in your .env file.");
}

program
	.name("tmdb-app")
	.description("Fetch movies from The Movie Database (TMDB)")
	.addOption(
		new Option("-t, --type <type>", "Type of movie to fetch").choices([
			"playing",
			"popular",
			"top",
			"upcoming",
		]).default("popular", "defaults to popular if no type is provided")
	)
	.option("-p, --page <number>", "Page number to fetch", myParseInt, 1)
	.option("-g, --genre <type>", "Movie genre to fetch")
	.action((options) => {
		fetchMovieData(options.type, options.page, options.genre)
	});

program.parse();
