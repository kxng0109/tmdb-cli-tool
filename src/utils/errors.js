import chalk from "chalk";

const errorMessage = (message, code = 0, exit = true) => {
	message = code ? `${code} - ${message}` : message;
	console.error(chalk.red(message));
	if (exit) {
		process.exit(1);
	}
};

const errorMessages = {
	ENOTFOUND: `Can not find address, incorrect hostname or check your internet connection.`,
	ETIMEDOUT: "Connection to api.themoviedb.org timed out. Try again.",
	400: "Error with your request. Incorrect parameters.",
	401: "You are not authorized to view this data. Check whether a valid token was provided in the .env file.",
	404: "Requested url can not be found. Check the url and try again.",
};

const getErrorMessage = (err) => {
	if (err.message && err.message.includes("ENOTFOUND"))
		return errorMessages.ENOTFOUND;
	if (err.message && err.message.includes("ETIMEDOUT"))
		return errorMessages.ETIMEDOUT;
	return (
		errorMessages[err.status] ||
		`An error occured while fetching data: ${err.message || err}.`
	);
};

const errorHandler = (err) => {
	errorMessage(getErrorMessage(err), err.status || 0);
};

export { errorHandler, errorMessage };
