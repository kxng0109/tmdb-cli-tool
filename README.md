# TMDB CLI TOOL

TMDB CLI App is a Command Line Interface (CLI) tool for fetching movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/). It supports Redis caching for faster responses and efficient API usage. Project idea gotten from [roadmap.sh](https://roadmap.sh/projects/tmdb-cli).

## Features
- Fetch movies by type (`popular`, `now playing`, `top-rated`, or `upcoming`).
- Caches API responses using Redis to optimize performance.
- Supports local and Redis Cloud setups.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kxng0109/tmdb-cli-tool.git
   cd tmdb-cli-tool
   ```

2. Install dependencies:
	```bash
	npm install
	```

3. Set up your `.env` file with your TMDB API token:
	```plaintext
	TMDB_TOKEN=your_tmdb_api_token
	```

## Usage
Run the CLI to fetch movies:
```bash
node . -t <type>
```
Examples:
- Fetch popular movies:
	```bash
	node . -t popular
	```

- Fetch top-rated movies:
	```bash
	node . -t top
	```

## Dependencies
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Redis](https://redis.io/) - Caching
- [Axios](https://axios-http.com/) - HTTP requests
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management
- [chalk](https://github.com/chalk/chalk) - Terminal string styling

## Future Plans
- Add support for Redis Cloud.
- Enhance the CLI interface with tabular outputs.
- Add more options for fetching movie details.

## License
This project is licensed under the MIT [License](/LICENSE).