const setMovieType = (movieType) => {
	if (movieType === "playing") {
		return "now_playing";
	} else if (movieType === "top") {
		return "top_rated";
	} else {
		return movieType;
	}
};

export default setMovieType;