import chalk from "chalk";

const errorMessage = (message, code = 0, exit = true) => {
	message = code ? `${code} - ${message}` : message;
	console.error(chalk.red(message));
	if (exit) {
		process.exit(1);
	}
};

const errorHandler = (err) => {
	if (err.message.includes("ENOTFOUND")) {
		errorMessage(
			"Can not find address, incorrect hostname or check your internet connection.",
		);
	} else if (err.message.includes("ETIMEDOUT")) {
		errorMessage("Connection to api.themoviedb.org timed out. Try again.");
	} else if (err.status === 400) {
		errorMessage(
			`Error with your request. Incorrect parameters. `,
			err.status,
		);
	} else if (err.status === 401) {
		errorMessage(
			`You are not authorized to view this data. Check whether a valid token was provided in the .env file. ${err.message}`,
			err.status,
		);
	} else if (err.status === 404) {
		errorMessage(
			"Requested url can not be found. Check the url and try again.",
			err.status,
		);
	} else {
		errorMessage(`An error occured while fetching data: ${err.message}.`);
	}
};

export { errorHandler, errorMessage };

