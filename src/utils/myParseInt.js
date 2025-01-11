import { errorMessage } from "./errors.js";

const myParseInt = (value, previous) =>{
	const parsedValue = parseInt(value, 10);
	if(isNaN(parsedValue)){
		errorMessage("Page option must be a number.")
	}
	if(parsedValue > 100){
		errorMessage("Pass in a value less than 100.")
	}
	return parsedValue;
}

export default myParseInt;