# TMDB CLI TOOL

TMDB CLI tool is a Command Line Interface (CLI) tool for fetching movie data from [The Movie Database (TMDB)](https://www.themoviedb.org/). You can fetch movies by type, genre, and page number, displaying results in a structured format. It supports Redis caching for faster responses and efficient API usage. Project idea gotten from [roadmap.sh](https://roadmap.sh/projects/tmdb-cli).

## Features

- Fetch movies by type (`popular`, `now playing`, `top-rated`, or `upcoming`).
- Filter movies by genre.
- Fetch data from specific pages of results.
- Results are displayed in a tabular format for better readability.
- Caches API responses using Redis to optimize performance.
- Supports local and Redis Cloud setups.

## Prerequisites

1. Node.js (version 16 or higher).
2. A Redis instance ([local](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/) or [cloud](https://redis.io/cloud/)).
3. A TMDB account and API key, which can be gotten from [TMDB](https://www.themoviedb.org/settings/api).

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

3. Create a `.env` file in the root directory and add your TMDB API token and Redis credentials:

   For local Redis:
   ```env
   TMDB_TOKEN=<your_tmdb_api_token>
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

   For Redis Cloud:
   ```env
   TMDB_TOKEN=<your_tmdb_api_token>
   REDIS_HOST=<your_redis_host>
   REDIS_PORT=<your_redis_port>
   REDIS_USERNAME=<your_redis_username>
   REDIS_PASSWORD=<your_redis_password>
   ```

4. Make the CLI executable and link it:
	```bash
	chmod +x app.js
	npm link
	```


## Usage
Run the CLI to fetch movies:
```bash
tmdb-app -t <type>
```

Replace `<type>` with one of the following options:
   - `popular` (default)
   - `playing` (now playing)
   - `top` (top rated)
   - `upcoming`

### Options:

| Option                | Description                                                      | Default Value         |
|-----------------------|------------------------------------------------------------------|-----------------------|
| `-t, --type <type>`   | Type of movies to fetch (`playing`, `popular`, `top`, `upcoming`). | `popular`            |
| `-p, --page <number>` | Page number of the results to fetch.                             | `1`                  |
| `-g, --genre <type>`  | Filter results by genre (e.g., `Action`, `Comedy`, `Drama, e.t.c`).      | None                 |

### Example Commands:

1. Fetch popular movies:
   ```bash
   tmdb-app -t popular
   ```

2. Fetch top-rated movies from page 2:
   ```bash
   -tmdb-app -t top -p 2
   ```

3. Fetch action movies that are currently popular:
   ```bash
   -tmdb-app -g Action
   ```

---

## Features in Detail

### Genre Filtering
The `-g, --genre` option allows you to filter movies by a specific genre. If you provide an invalid genre name, the CLI will return an error.

### Caching with Redis
Results are cached in Redis for improved performance:
- Movies by type and page are cached for 10 minutes.
- Genre lists are cached for 24 hours.

You can configure the Redis connection through the `.env` file as described above.

---

## Redis Setup

### Local Redis Setup
- Install Redis locally on your system.
- Ensure Redis is running on the default port (`6379`).

### Redis Cloud Setup
- Sign up for a free Redis Cloud account [here](https://redis.com/try-free/).
- Obtain your Redis Cloud credentials and add them to the `.env` file.

---

## How It Works

1. Fetches movie data from the TMDB API based on the type specified.
2. Checks Redis for cached data before making API calls.
3. Converts genre IDs to readable text using TMDB genre API.
4. Displays the fetched data in the terminal.

## Development

### Folder Structure

```
.
├── src
│   ├── services
│   │   ├── fetchMovieData.js
│   │   ├── fetchGenres.js
│   │   ├── handleData.js
│   │   └── redisClient.js
│   ├── utils
│   │   ├── errors.js
│   │   ├── logOngoing.js
│   │   ├── logSuccess.js
│   │   ├── myParseInt.js
│   │   └── setMovieType.js
├── app.js
├── package.json
└── .env
```

### Key Files

- `app.js`: Entry point for the CLI application.
- `fetchMovieData.js`: Fetches movies from TMDB and caches results in Redis.
- `fetchGenres.js`: Fetches genre data from TMDB and caches it in Redis.
- `errors.js`: Handles error messaging and exits the application on failures.
- `redisClient.js`: Sets up Redis Client using configuration provided in the `.env` file or the default values, and connects to the Redis server.
- `setMovieType.js`: Maps user-friendly movie types to TMDB API endpoints.

## Example Output

By default the output will appear in a tabular form, but you can always make changes to [handleData.js](/src/services/handleData.js) to appear in JSON format like:
```json
{
  "title": "The Shawshank Redemption",
  "genre": [ "'Drama'", "'Crime'" ],
  "releaseDate": "1994-09-23"
}
{
  "title": "The Godfather",
  "genre": [ "Drama", "Crime" ],
  "releaseDate": "1972-03-14"
}
```

## Troubleshooting

- **Redis Client Error**: Ensure your Redis server is running and the credentials in `.env` are correct.
- **No TMDB Token**: Verify that the `TMDB_TOKEN` in your `.env` file is accurate.

## Dependencies
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Redis](https://redis.io/) - Caching
- [Axios](https://axios-http.com/) - HTTP requests
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management
- [chalk](https://github.com/chalk/chalk) - Terminal string styling
- [cli-table3](https://github.com/cli-table/cli-table3) - Showing results in tabular form

## Future Plans
- [X] Add support for Redis Cloud.
- [X] Enhance the CLI interface with tabular outputs.
- [X] Add more options for fetching movie details.

## License
This project is licensed under the MIT [License](/LICENSE).

## Notes
- Please ensure your Redis server is running before using the CLI tool.
- Make sure your `.env` file is correctly configured to avoid runtime errors.