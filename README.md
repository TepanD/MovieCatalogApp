# MovieCatalogApp

This repository is TepanD's final project also a portfolio which is mandatory in order to complete
"Belajar Fundamental Front-End Web Development" (Learn Front-End Web Development Fundamental) course
from [Dicoding](https://dicoding.com) online web development course.

`This project is using https://www.themoviedb.org API.`

## APIs used in this project:

1. GET movies by title (searching):
   - `https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=en-US&query={KEYWORD}&page=${PAGE}`

2. GET movies by popularity (Trending):
   - `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

3. GET now_playing movies (Now Playing):
   - `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&languange=en-US&page=1`

4. GET movie details:
   - `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`

5. GET discover new movies:
   - `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`

6. To get the poster_path or the backdrop_path:

- `https://image.tmdb.org/t/p/original/${RETURNED.poster_path}`

## Create .env file in the root folder in this format:

```
BASE_URL=https://api.themoviedb.org/3
API_KEY={YOUR_API_KEY}
```

- Get your api key at [The Movie Database](https://www.themoviedb.org)
